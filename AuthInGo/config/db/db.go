package config

import (
	"database/sql"
	"fmt"
	env "AuthInGo/config/env"
	"github.com/go-sql-driver/mysql"
)



// setup the database connection using the configuration parameters from the environment variables.
// The SetupDB function is responsible for initializing and configuring the database layer of the application.	

func SetupDB() (*sql.DB, error) {
	cfg := mysql.NewConfig()
	cfg.User = env.GetString("DB_USER", "root")
	cfg.Passwd = env.GetString("DB_PASSWORD", "")
	cfg.Net = env.GetString("DB_NET", "tcp")	
	cfg.Addr = env.GetString("DB_ADDR", "127.0.0.1:3306")
	cfg.DBName = env.GetString("DBName", "auth_dev")

	fmt.Println("Connecting to database with config:", cfg.FormatDSN())

	db, err := sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		fmt.Println("Error opening database:", err)
		return nil, err
	}

	fmt.Println("Trying to conncet to databse")
	pingErr := db.Ping()
	if pingErr != nil {
		fmt.Println("Error pinging database:", pingErr)
		return nil, pingErr
	}

	fmt.Println("Successfully connected to database")

	return db, nil
}