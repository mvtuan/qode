package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Comment struct {
	ID      primitive.ObjectID `bson:"_id"`
	PostID  primitive.ObjectID `json:"postID,omitempty" bson:"post_id,omitempty"`
	Comment string             `json:"comment,omitempty" bson:"comment,omitempty"`
}
