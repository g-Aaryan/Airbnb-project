package middlewares

import (
	"net/http"
	"strings"
	"github.com/golang-jwt/jwt/v5"
	env "AuthInGo/config/env"
	"fmt"
	"context"
	"strconv"
	

)

func JWTAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header missing", http.StatusUnauthorized)
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			http.Error(w, "Invalid authorization header format", http.StatusUnauthorized)
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		if tokenString == "" {
			http.Error(w, "Token missing", http.StatusUnauthorized)
			return
		}

		claims := jwt.MapClaims{}

		_, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(env.GetString("JWT_SECRET", "TOKEN")), nil
		})

		if err != nil {
			http.Error(w, "Invalid token: "+err.Error(), http.StatusUnauthorized)
			return
		}

		userId, okId := claims["id"].(float64)
		email, okEmail := claims["email"].(string)

		if !okId || !okEmail {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			return
		}

		fmt.Println("Authenticated user ID:", int64(userId), "Email:", email)

		ctx := context.WithValue(r.Context(), "userID", strconv.FormatFloat(userId, 'f', 0, 64)) // store user id as string in context 
		// (just the conversion of float64 to string)
		ctx = context.WithValue(ctx, "email", email) // store email in context

		next.ServeHTTP(w, r.WithContext(ctx))
		


	})
}