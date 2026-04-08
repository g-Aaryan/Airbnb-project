package utils

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	hash,err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		fmt.Println("Error hashing password:", err)
		return "", err
	}

	return string(hash), nil

}  // this function takes a plain text password as input and returns a hashed version of the password using the bcrypt algorithm.
//  It also handles any errors that may occur during the hashing process and returns an appropriate error message if needed.


func CheckPasswordHash(password string, hashpass string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashpass), []byte(password))
	return err == nil
}
// this function takes a plain text password and a hashed password as input and compares them using the bcrypt algorithm.

