package controllers

import (
	"github.com/gin-gonic/gin"
)

// LoginController is a struct to define the login controller
type LoginController struct {
}

// NewLoginController is a function to create a new login controller
func NewLoginController() *LoginController {
	return &LoginController{}
}

// Login is a function to handle the login request
func (controller *LoginController) Login(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Login",
	})
}