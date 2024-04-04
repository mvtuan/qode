package controllers

import (
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"qode-be/db"
	"qode-be/models"
	"time"
)

var commentCollection *mongo.Collection = db.GetCollection(db.DB, "comments")

func GetComments(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var comments []models.Comment
	postID := c.Query("postID")
	defer cancel()

	id, _ := primitive.ObjectIDFromHex(postID)
	results, err := commentCollection.Find(ctx, bson.M{"post_id": id})

	if err != nil {
		c.JSON(http.StatusInternalServerError, Response{Status: http.StatusInternalServerError, Message: "error", Data: err.Error()})
		return
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var singleComment models.Comment
		if err = results.Decode(&singleComment); err != nil {
			c.JSON(http.StatusInternalServerError, Response{Status: http.StatusInternalServerError, Message: "error", Data: err.Error()})
		}

		comments = append(comments, singleComment)
	}

	c.JSON(http.StatusOK,
		Response{Status: http.StatusOK, Message: "success", Data: comments},
	)
}

func CreateComment(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var comment models.Comment
	defer cancel()

	//validate the request body
	if err := c.BindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, Response{Status: http.StatusBadRequest, Message: "error", Data: err.Error()})
		return
	}

	newComment := models.Comment{
		ID:      primitive.NewObjectID(),
		PostID:  comment.PostID,
		Comment: comment.Comment,
	}

	result, err := commentCollection.InsertOne(ctx, newComment)
	if err != nil {
		c.JSON(http.StatusInternalServerError, Response{Status: http.StatusInternalServerError, Message: "error", Data: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, Response{Status: http.StatusCreated, Message: "success", Data: result})
}
