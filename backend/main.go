package main

import (
	"gomoku/routes"
)

func main() {
	router := routes.GetRouter()
	router.Run(":8080")
}
