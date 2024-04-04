package routes

import (
	"github.com/gin-gonic/gin"
	"qode-be/controllers"
)

func CommentRoute(r *gin.Engine) {
	r.GET("/comments", controllers.GetComments)
	r.POST("/comment", controllers.CreateComment)
}
