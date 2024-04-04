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

var postCollection *mongo.Collection = db.GetCollection(db.DB, "posts")

type Response struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func GetPost(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	postID := c.Param("id")
	var post models.Post
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(postID)

	err := postCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&post)
	if err != nil {
		c.JSON(http.StatusInternalServerError, Response{Status: http.StatusInternalServerError, Message: "error", Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, Response{Status: http.StatusOK, Message: "success", Data: post})
}

func GetPosts(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var posts []models.Post
	defer cancel()

	results, err := postCollection.Find(ctx, bson.M{})

	if err != nil {
		c.JSON(http.StatusInternalServerError, Response{Status: http.StatusInternalServerError, Message: "error", Data: err.Error()})
		return
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var singlePost models.Post
		if err = results.Decode(&singlePost); err != nil {
			c.JSON(http.StatusInternalServerError, Response{Status: http.StatusInternalServerError, Message: "error", Data: err.Error()})
		}

		posts = append(posts, singlePost)
	}

	c.JSON(http.StatusOK,
		Response{Status: http.StatusOK, Message: "success", Data: posts},
	)
}

func CreatePost(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var post models.Post
	defer cancel()

	//validate the request body
	if err := c.BindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, Response{Status: http.StatusBadRequest, Message: "error", Data: err.Error()})
		return
	}

	newPost := models.Post{
		ID:       primitive.NewObjectID(),
		Content:  post.Content,
		ImageUrl: post.ImageUrl,
	}

	result, err := postCollection.InsertOne(ctx, newPost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, Response{Status: http.StatusInternalServerError, Message: "error", Data: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, Response{Status: http.StatusCreated, Message: "success", Data: result})
}

func DeletePost(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	postId := c.Param("postId")
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(postId)

	result, err := postCollection.DeleteOne(ctx, bson.M{"id": objId})

	if err != nil {
		c.JSON(http.StatusInternalServerError, Response{Status: http.StatusInternalServerError, Message: "error", Data: err.Error()})
		return
	}

	if result.DeletedCount < 1 {
		c.JSON(http.StatusNotFound,
			Response{Status: http.StatusNotFound, Message: "error", Data: "User with specified ID not found!"},
		)
		return
	}

	c.JSON(http.StatusOK,
		Response{Status: http.StatusOK, Message: "success", Data: "User successfully deleted!"},
	)
}
