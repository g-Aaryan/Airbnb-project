package controllers

import (
	"fmt"
	"net/http"
	"AuthInGo/services"
)


type UserController struct {
	userService services.UserService
}

func NewUserController(_userService services.UserService) *UserController {
	return &UserController{
		userService: _userService,
	}
}

func (uc *UserController) RegisterUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Registering user in UserController")
	uc.userService.CreateUser()
	w.Write([]byte("User registered successfully"))
}