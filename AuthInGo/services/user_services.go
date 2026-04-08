package services

import (
	db "AuthInGo/db/repositories"
	"fmt"
	"AuthInGo/utils"
)

type UserService interface {
	GetUserById() error
	CreateUser() error
	LoginUser() (string, error)
}

type UserServiceImpl struct {
	userRepository db.UserRepository
} // here the type is userrepo interface and any struct that implement the userrepo interface can be used here and we can easily swap the implementation if needed in the future without changing the service layer code.

func NewUserService(_userRepository db.UserRepository) UserService {
	return &UserServiceImpl{
		userRepository: _userRepository,
	}
} // this is di here loose coupling between service and repository layer and we can easily swap the implementation if needed in the future without changing the service layer code.

func (u *UserServiceImpl) GetUserById() error {
	fmt.Println("Fetching user in UserService")
	u.userRepository.Create()
	return nil
}

func (u *UserServiceImpl) CreateUser() error {
	fmt.Println("Creating user in UserService")
	password := "password123"
	hash, err := utils.HashPassword(password)
	if err != nil {
		return err
	}
	u.userRepository.Create(
		"username1",
		"user@gmail.com",
		hash,

	)
	return nil
}

func (u *UserServiceImpl) LoginUser() (string, error) {
	email := "user@gmail.com"
	password := "password123"

	user, err := u.userRepository.GetByEmail(email)
	if err != nil {
		fmt.Println("Error fetching user by email:", err)
		return "", err
	}

	if user == nil {
		fmt.Println("User not found with email:", email)
		return "", fmt.Errorf("user not found")
	}

	isPasswordValid := utils.CheckPasswordHash(password, user.Password)

	if !isPasswordValid {
		fmt.Println("Invalid password for user with email:", email)
		return "", fmt.Errorf("invalid password")
	}

		payload := jwt.MapClaims{
		"email": user.Email,
		"id":    user.Id,
	}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload) 
		tokenString, err := token.SignedString([]byte(env.GetString("JWT_SECRET", "TOKEN")))

		if err != nil {
			fmt.Println("Error signing token:", err)
			return "", err
		}

		fmt.Println("JWT Token:", tokenString)

	return tokenString, nil

}