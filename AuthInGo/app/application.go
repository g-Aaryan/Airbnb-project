package app

import (
	config "AuthInGo/config/env"
	dbConfig "AuthInGo/config/db"

	"AuthInGo/controllers"
	repo "AuthInGo/db/repositories"
	"AuthInGo/router"
	"AuthInGo/services"
	"fmt"
	"net/http"
	"time"
)

// configuration for the server
type Config struct {
	Addr string 
}


// app initialization and server setup
type Application struct {
	Config Config
}

// Constructor for Config
// copy is cheap in go so we can return by value and it will not cause any performance issues
func NewConfig() Config {

	port := config.GetString("PORT", ":8080")
	return Config{
		Addr: port,
	}
}

// Constructor for Application
// return by pointer to avoid copying the entire struct and to allow for modifications to the Application instance if needed in the future.
//  It also allows for better performance when the struct is large, as it avoids unnecessary copying of data.
func NewApplication(cfg Config) *Application {
	return &Application{
		Config: cfg,
	}
}


// member function to run the server and handle incoming requests. 
// It sets up the database connection, initializes the repositories, services, and controllers, and starts the HTTP server with the configured router.
//  It also includes error handling for database setup and server startup.
func (app *Application) Run() error {

	db, err := dbConfig.SetupDB()

	if err != nil {
		fmt.Println("Error setting up database:", err)
		return err
	}

	ur := repo.NewUserRepository(db)
	rr := repo.NewRoleRepository(db)
	rpr := repo.NewRolePermissionRepository(db)
	us := services.NewUserService(ur)
	rs := services.NewRoleService(rr, rpr)
	uc := controllers.NewUserController(us)
	rc := controllers.NewRoleController(rs)
	uRouter := router.NewUserRouter(uc)
	rRouter := router.NewRoleRouter(rc)

	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      router.SetupRouter(uRouter,rRouter),
		ReadTimeout:  10 * time.Second, // Set read timeout to 10 seconds
		WriteTimeout: 10 * time.Second, // Set write timeout to 10 seconds
	}

	fmt.Println("Starting server on", app.Config.Addr)

	return server.ListenAndServe()
}