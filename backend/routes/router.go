package routes

import (
	"github.com/gin-gonic/gin"

	"gomoku/controllers"
)

func GetRouter() *gin.Engine {
	router := gin.Default()

	api := router.Group("/api/v1")
	{
		users := api.Group("/users")
		{
			searchUsersController := controllers.NewSearchUsersController()
			users.GET("/", searchUsersController.SearchUsers)
			loginController := controllers.NewLoginController()
			users.POST("/login", loginController.Login)
		}

		friends := api.Group("/friends")
		{
			friendsController := controllers.NewFriendsController()
			friends.GET("/", friendsController.GetFriends)
		}
	}

	return router
}
