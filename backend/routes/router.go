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
			users.GET("/", func(c *gin.Context) {
				c.JSON(200, gin.H{
					"message": "All users",
				})
			}
			)
		}

		friends := api.Group("/friends")
		{
		}

	}

	return router
}