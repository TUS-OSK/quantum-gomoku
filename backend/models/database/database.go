package database

import (
	"github.com/jinzhu/gorm"
)

// Database struct
type Database struct {
	*gorm.DB
}
