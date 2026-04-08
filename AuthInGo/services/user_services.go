package services

import (
	db "AuthInGo/db/repositories"
	"fmt"
)

type UserService interface {
	GetUserById() error
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