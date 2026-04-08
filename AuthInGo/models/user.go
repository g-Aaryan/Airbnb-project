package models

// sruct for centralized data definition of the User entity, which includes fields such as Id, Username, Email, Password, CreatedAt, and UpdatedAt.
type User struct {
	Id        int64
	Username  string
	Email     string
	Password  string
	CreatedAt string
	UpdatedAt string
}
