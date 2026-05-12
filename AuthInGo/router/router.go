package router

import (
	env "AuthInGo/config/env"
	"AuthInGo/controllers"
	"AuthInGo/middlewares"
	"AuthInGo/utils"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type Router interface {
	Register(r chi.Router)
}

func SetupRouter(UserRouter Router, RoleRouter Router) *chi.Mux {
	chiRouter := chi.NewRouter()

	chiRouter.Use(middlewares.RateLimitMiddleware)
	chiRouter.Use(middleware.Logger) // Built-in Chi middleware for logging requests

	chiRouter.Get("/ping", controllers.PingHandler)
	chiRouter.HandleFunc("/fakestoreservice/*", utils.ProxyToService("https://fakestoreapi.com", "/fakestoreservice"))
	
	UserRouter.Register(chiRouter)
	RoleRouter.Register(chiRouter)

	// API Gateway: Reverse proxy to internal microservices
	chiRouter.Group(func(r chi.Router) {
		// Protect these routes with JWT middleware
		r.Use(middlewares.JWTAuthMiddleware)

		bookingServiceURL := env.GetString("BOOKING_SERVICE_URL", "http://localhost:8001")
		hotelServiceURL := env.GetString("HOTEL_SERVICE_URL", "http://localhost:8002")
		notificationServiceURL := env.GetString("NOTIFICATION_SERVICE_URL", "http://localhost:8003")
		reviewServiceURL := env.GetString("REVIEW_SERVICE_URL", "http://localhost:8004")

		r.HandleFunc("/booking/*", utils.ProxyToService(bookingServiceURL, "/booking"))
		r.HandleFunc("/hotel/*", utils.ProxyToService(hotelServiceURL, "/hotel"))
		r.HandleFunc("/notification/*", utils.ProxyToService(notificationServiceURL, "/notification"))
		r.HandleFunc("/review/*", utils.ProxyToService(reviewServiceURL, "/review"))
	})

	return chiRouter
}
