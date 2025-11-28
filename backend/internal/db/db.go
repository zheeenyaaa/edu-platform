package db

import (
	"log"
	"os"

	"backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://postgres:pass@localhost:5432/edu?sslmode=disable"
	}

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	DB = database
	log.Println("✅ Database connected")
}

func AutoMigrate() {
	err := DB.AutoMigrate(&models.Material{}, &models.Homework{})
	if err != nil {
		log.Fatal("❌ Migration failed:", err)
	}
	log.Println("✅ Database migrated")
}
