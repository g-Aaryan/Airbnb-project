package controllers

import (
	"AuthInGo/services"
	"fmt"
	"net/http"
	"AuthInGo/utils"
	"AuthInGo/dto"
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
	var payload dto.LoginUserRequestDTO

	jsonErr := utils.ReadJsonBody(r, &payload) // convert the request body into a struct and store it in the payload variable. 

	// If there is an error during this process, it will be stored in jsonErr.
	if jsonErr != nil {
		utils.WriteJsonErrorResponse(w, http.StatusBadRequest, "Invalid JSON payload", jsonErr)
	}

	fmt.Println("payload:", payload) // log the payload json format

	validationErr := utils.Validator.Struct(payload) // validate the payload struct using the shared validator instance from the utils package.

	if validationErr != nil {
		utils.WriteJsonErrorResponse(w, http.StatusBadRequest, "Validation failed", validationErr)
		return
	}

	jwtToken, err := uc.userService.LoginUser(payload) // call the LoginUser method of the user service, passing the validated payload. The result is expected to be a JWT token if the login is successful.

	if err != nil {
		utils.WriteJsonErrorResponse(w, http.StatusUnauthorized, "Login failed", err)
		return
	}

	utils.WriteJsonSuccessResponse(w, http.StatusOK, "Login successful", jwtToken) // If the login is successful, it sends a JSON response with a success message and the JWT token.
}

func (u *UserController) CreateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Creating user in UserController")
	u.userService.CreateUser()
	w.Write([]byte("User created successfully"))
}