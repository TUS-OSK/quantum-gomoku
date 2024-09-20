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

type User struct {
	Username string `json:"username"`
	Icon     string `json:"icon"`
}

type SearchUsersResponse struct {
	Users []User `json:"users"`
}

// SearchUsers is a function to search users
func (controller *SearchUsersController) SearchUsers(context *gin.Context) {
	user_suffix := context.Query("username")
	if user_suffix == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error": "query parameter 'username' is required"})
		return
	}
	response := SearchUsersResponse{}

	switch user_suffix {
	case "OSK":
		response.Users = append(response.Users, User{Username: "OSK", Icon: "https://oskt.us/favicon.ico"})
	case "OSS":
		response.Users = append(response.Users, User{Username: "OSS"})
	case "OS":
		response.Users = append(response.Users,
			User{Username: "OSK", Icon: "https://oskt.us/favicon.ico"},
			User{Username: "OSS"},
		)
	case "O":
		response.Users = append(response.Users,
			User{Username: "O", Icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Latin_letter_O.svg/1920px-Latin_letter_O.svg.png"},
			User{Username: "OSK", Icon: "https://oskt.us/favicon.ico"},
			User{Username: "OSS"})
	}

	context.JSON(http.StatusOK, response)
}
