package main

import (
	"backend/internal/db"
	"backend/internal/handlers"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Connect DB
	db.ConnectDB()
	db.AutoMigrate()

	r := gin.Default()
	r.Use(cors())

	api := r.Group("/api")
	{
		api.GET("/materials", handlers.GetMaterials)
		api.POST("/homework/upload", handlers.UploadHomework)
	}

	log.Println("Backend started on :8000")
	r.Run(":8000")
}

func cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}

		c.Next()
	}
}
