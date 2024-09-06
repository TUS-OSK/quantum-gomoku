package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"backend/routes"
)

func main() {
	router := routes.GetRouter()
	router.Run(":8080")
}
