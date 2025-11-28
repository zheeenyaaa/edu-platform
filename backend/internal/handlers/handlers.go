package handlers

import (
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"

	"backend/internal/db"
	"backend/internal/models"
)

func GetMaterials(c *gin.Context) {
	var materials []models.Material
	db.DB.Find(&materials)
	c.JSON(http.StatusOK, materials)
}

func UploadHomework(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file upload error"})
		return
	}

	uploadDir := "./uploads"
	os.MkdirAll(uploadDir, os.ModePerm)

	path := filepath.Join(uploadDir, file.Filename)

	err = c.SaveUploadedFile(file, path)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "save error"})
		return
	}

	hw := models.Homework{
		Student:  "student1",
		FilePath: path,
	}

	db.DB.Create(&hw)

	c.JSON(http.StatusOK, gin.H{
		"id":       hw.ID,
		"filename": file.Filename,
	})
}
