package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"	
)

func main() {
	router := routes.GetRouter()
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, World!!",
		})
	})

	router.Run(":8080")
}
