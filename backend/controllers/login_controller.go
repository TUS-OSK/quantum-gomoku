package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// LoginController is a struct to define the login controller
type LoginController struct {
}

// NewLoginController is a function to create a new login controller
func NewLoginController() *LoginController {
	return &LoginController{}
}

// LoginRequest is a struct to define the login request
type LoginRequest struct {
	Message string `json:"message" binding:"required"`
}

// LoginResponse is a struct to define the login response
type LoginResponse struct {
	Message string `json:"message"`
}

// Login is a function to handle the login request
func (controller *LoginController) Login(c *gin.Context) {
	var request LoginRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var response LoginResponse
	response.Message = "Login successful"
	c.JSON(http.StatusOK, response)
}
