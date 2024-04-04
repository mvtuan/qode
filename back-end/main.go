package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"qode-be/routes"
	"time"
)

func main() {
	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"POST", "GET", "PUT", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
	config.ExposeHeaders = []string{"Content-Length"}
	config.AllowCredentials = true
	config.MaxAge = 12 * time.Hour

	r.Use(cors.New(config))
	routes.PostRoute(r)
	routes.CommentRoute(r)

	r.Run(":8080")
}
