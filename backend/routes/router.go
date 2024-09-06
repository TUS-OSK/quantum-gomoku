package routes

import (
	"github.com/gin-gonic/gin"
)

func GetRouter() *gin.Engine {
	router := gin.Default()

	api := router.Group("/api/v1")
	{
		users := api.Group("/users")
		{
		}

		friends := api.Group("/friends")
		{
		}
	}

	}

	return router
}