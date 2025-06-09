package config

import (
	"fmt"
	"time"
	"typetype/entity"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("DatabaseTypeType.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.User{},
		&entity.PlayerScore{},
		&entity.HistoryType{},
		&entity.ModeWords{},
		&entity.AllWord{},
		&entity.Words{},
		&entity.Language{},
	)

	hashedPassword, _ := HashPassword("1")
	//Example code
	var countExampleData int64
	db.Model(&entity.User{}).Count(&countExampleData)

	if countExampleData < 1 {
		User := []entity.User{
			{UserName: "PorGz", Password: hashedPassword, Email: "PorGz@gmail.com", Picture: "https://c8.alamy.com/comp/2R884Y1/cute-cartoon-baby-kiwi-bird-2R884Y1.jpg", Level: 1, TestCompleted: 1, DayStart: time.Now()},
			{UserName: "Monkey", Password: hashedPassword, Email: "Monkey@gmail.com", Picture: "https://c8.alamy.com/comp/2R884Y1/cute-cartoon-baby-kiwi-bird-2R884Y1.jpg", Level: 1, TestCompleted: 1, DayStart: time.Now()},
		}
		for _, pkg := range User {
			db.FirstOrCreate(&pkg, entity.User{Email: pkg.Email})
		}
	} else {
		fmt.Println("ข้อมูลตัวอย่างมีครบแล้ว")
	}
}
