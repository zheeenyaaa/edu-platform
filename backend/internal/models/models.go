package models

import "gorm.io/gorm"

type Material struct {
	gorm.Model
	Title       string
	Description string
	FilePath    string
}

type Homework struct {
	gorm.Model
	Student  string
	FilePath string
	Comment  string
	Grade    int
}
