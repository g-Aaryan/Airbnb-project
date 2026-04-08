package controllers

import (
	"AuthInGo/services"
	"fmt"
	"net/http"
)

type UserController struct {
	userService services.UserService
}

func NewUserController(_userService services.UserService) *UserController {
	return &UserController{
		userService: _userService,
	}
}   // DI instead of hardcoding we are passing the dependent service from outside
	// Loose coupling

func (uc *UserController) GetUserById(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Fetching user in UserController")
	uc.userService.GetUserById()
	w.Write([]byte("User fetched successfully"))
}

func (uc *UserController) LoginUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Login user in UserController")
	uc.userService.LoginUser()
	w.Write([]byte("User logged in successfully"))
}

func (u *UserController) CreateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Creating user in UserController")
	u.userService.CreateUser()
	w.Write([]byte("User created successfully"))
}