package db

import (
	"fmt"
	"AuthInGo/models"
	"database/sql"

)

// interface defining the methods for user repository, including Create, GetByID, GetAll, and DeleteByID.
type UserRepository interface {  
	Create() error
	GetByID() (*models.User, error)
	GetAll() ([]*models.User, error)
	DeleteByID(id int64) error
}


// actual implementation of the UserRepository interface, which interacts with the database to perform CRUD operations on user data.
type UserRepositoryImpl struct{
	db *sql.DB
}


// constructor function for the UserRepositoryImpl struct, which takes a database connection as an argument and returns a new instance of the UserRepository interface.
func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryImpl{
	db: _db,	}
} // constructor make only one time use multiple time


// A type implement an interface only if it has all the methods defined in the interface.
func (u *UserRepositoryImpl) GetAll() ([]*models.User, error) {
	return nil, nil
}

func (u *UserRepositoryImpl) DeleteByID(id int64) error {
	return nil
}

func (u *UserRepositoryImpl) Create() error {
	query := "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"

	result, err := u.db.Exec(query, "testuser", "test@test.com", "password123")

	if err != nil {
		fmt.Println("Error inserting user:", err)
		return err
	}

	rowsAffected, rowErr := result.RowsAffected()

	if rowErr != nil {
		fmt.Println("Error getting rows affected:", rowErr)
		return rowErr
	}

	if rowsAffected == 0 {
		fmt.Println("No rows were affected, user not created")
		return nil
	}

	fmt.Println("User created successfully, rows affected:", rowsAffected)

	return nil
}


func (u *UserRepositoryImpl) GetByID() (*models.User, error) {
		fmt.Println("Fetching user in UserRepository")

		query := "SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?"

		row := u.db.QueryRow(query, 1)

		user := &models.User{}

		err := row.Scan(&user.Id, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt)

		if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No user found with the given ID")
			return nil, err
		} else {
			fmt.Println("Error scanning user:", err)
			return nil, err
		}
	}

	fmt.Println("User fetched successfully:", user)

	return user, nil

}