package controllers

import (
	"github.com/gin-gonic/gin"
)

// FriendsController is a struct to define the friends controller
type FriendsController struct {
}

// NewFriendsController is a function to create a new friends controller
func NewFriendsController() *FriendsController {
	return &FriendsController{}
}


// GetFriends is a function to handle the get friends request
func (controller *FriendsController) GetFriends(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Get Friends",
	})
}
