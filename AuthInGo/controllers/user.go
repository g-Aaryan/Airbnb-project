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
		fmt.Println("Fetching user by ID in UserController")
	// extract userid from url parameters
	userId := r.URL.Query().Get("id")
	if userId == "" {
		userId = r.Context().Value("userID").(string) // Fallback to context if not in URL
	}
	fmt.Println("User ID from context or query:", userId)

	if userId == "" {
		utils.WriteJsonErrorResponse(w, http.StatusBadRequest, "User ID is required", fmt.Errorf("missing user ID"))
		return
	}


	user, err := uc.userService.GetUserById(userId)

	if err != nil {
		utils.WriteJsonErrorResponse(w, http.StatusInternalServerError, "Failed to fetch user", err)
		return
	}
	if user == nil {
		utils.WriteJsonErrorResponse(w, http.StatusNotFound, "User not found", fmt.Errorf("user with ID %s not found", userId))
		return
	}
	utils.WriteJsonSuccessResponse(w, http.StatusOK, "User fetched successfully", user)
	fmt.Println("User fetched successfully:", user)
}

func (uc *UserController) LoginUser(w http.ResponseWriter, r *http.Request) {
	payload := r.Context().Value("payload").(*dto.LoginUserRequestDTO) // extract the payload from the request context, which was set by the UserLoginRequestValidator middleware. The payload is expected to be of type LoginUserRequestDTO.

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
	payload := r.Context().Value("payload").(*dto.CreateUserRequestDTO) // extract the payload from the request context, which was set by the UserCreateRequestValidator middleware. The payload is expected to be of type CreateUserRequestDTO.

	fmt.Println("payload recieved",payload) // log the payload json format
	

	user,err := u.userService.CreateUser(payload)
	if err != nil {
		utils.WriteJsonErrorResponse(w, http.StatusInternalServerError, "Failed to create user", err)
		return
	}

	utils.WriteJsonSuccessResponse(w, http.StatusCreated, "User created successfully", user)
	fmt.Println("User created successfully:", user)
}