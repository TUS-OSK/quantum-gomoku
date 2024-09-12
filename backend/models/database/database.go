package database

import (
	"gorm.io/gorm"
)

// Database struct
type Database struct {
	*gorm.DB
}
