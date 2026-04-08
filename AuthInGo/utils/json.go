package utils

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
)

var Validator *validator.Validate // shared validator instance for struct validation

func init() {
	fmt.Println("Initializing utils package")
	Validator = NewValidator()
} // validator is created automatically when the package is imported, ensuring it's ready for use across the application without needing explicit initialization in other parts of the code.

func NewValidator() *validator.Validate {
	return validator.New(validator.WithRequiredStructEnabled())
} // If a struct field exists → it will be validated even if empty

func WriteJsonResponse(w http.ResponseWriter, status int, data any) error {
	w.Header().Set("Content-Type", "application/json") // tells the client that the response body contains JSON data.
	w.WriteHeader(status) // Sets HTTP status code
	return json.NewEncoder(w).Encode(data) // encode the data as json and write it to the response body 
} 


// standard success response format.
func WriteJsonSuccessResponse(w http.ResponseWriter, status int, message string, data any) error {
	response := map[string]any{}

	response["status"] = "success"
	response["message"] = message
	response["data"] = data
	return WriteJsonResponse(w, status, response)
}


// standard error response format.
func WriteJsonErrorResponse(w http.ResponseWriter, status int, message string, err error) error {
	response := map[string]any{}

	response["status"] = "error"
	response["message"] = message
	response["error"] = err.Error()

	return WriteJsonResponse(w, status, response)
}

func ReadJsonBody(r *http.Request, result any) error {
	decoder := json.NewDecoder(r.Body) // read the request body and create a new JSON decoder
	decoder.DisallowUnknownFields() // prevent unknown fields in the JSON payload.
	return decoder.Decode(result)
}

// by the time validator runs unknown fileds that gets removed therefore to prevent this use DisallowUnknownFields() to ensure that any fields in the JSON payload that do not match the struct fields will cause an error.