package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Post struct {
	ID       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Content  string             `json:"content,omitempty" bson:"content,omitempty"`
	ImageUrl string             `json:"imageUrl,omitempty" bson:"imageUrl,omitempty"`
}
