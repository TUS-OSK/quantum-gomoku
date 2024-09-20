package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// SearchUsersController is a struct to define the search users controller
type SearchUsersController struct {
}

// NewSearchUsersController is a function to create a new search users controller
func NewSearchUsersController() *SearchUsersController {
	return &SearchUsersController{}
}


// SearchUsers is a function to search users
func (controller *SearchUsersController) SearchUsers(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"users": "users"})
}
