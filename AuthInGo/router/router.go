package router

import (
	"AuthInGo/controllers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"AuthInGo/middlewares"
	"AuthInGo/utils"
)

type Router interface {
	Register(r chi.Router)
}

func SetupRouter(UserRouter Router) *chi.Mux {
	chiRouter := chi.NewRouter()
	

	chiRouter.Use(middlewares.RateLimitMiddleware)
	chiRouter.Use(middleware.Logger) // Built-in Chi middleware for logging requests


	chiRouter.Get("/ping", controllers.PingHandler)
	chiRouter.HandleFunc("/fakestoreservice/*", utils.ProxyToService("https://fakestoreapi.com", "/fakestoreservice"))
	UserRouter.Register(chiRouter)
	return chiRouter
}
