package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// FriendsController is a struct to define the friends controller
type FriendsController struct {
}

// NewFriendsController is a function to create a new friends controller
func NewFriendsController() *FriendsController {
	return &FriendsController{}
}

// GetFriendsResponse is a struct to define the get friends response
type GetFriendsResponse struct {
	Message string `json:"message"`
}

// GetFriends is a function to handle the get friends request
func (controller *FriendsController) GetFriends(c *gin.Context) {

	var response GetFriendsResponse
	response.Message = "Get friends successful"
	c.JSON(http.StatusOK, response)
}
