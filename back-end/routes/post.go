package routes

import (
	"github.com/gin-gonic/gin"
	"qode-be/controllers"
)

func PostRoute(r *gin.Engine) {
	r.GET("/posts", controllers.GetPosts)
	r.GET("/post/:id", controllers.GetPost)
	r.POST("/post", controllers.CreatePost)
	r.DELETE("/post/:id", controllers.DeletePost)
}
