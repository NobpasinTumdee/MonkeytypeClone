package config

import (
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"typetype/entity"
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

	//hashedPassword, _ := HashPassword("1")
	//Example code
	// Membership := []entity.Membership{
	// 	{PackageName: "Week" ,Day: 7,Pwa: 350,Pea: 700,RentalFee: 1050},
	// 	{PackageName: "Mount" ,Day: 30,Pwa: 1500,Pea: 3000,RentalFee: 3600},
	// 	{PackageName: "Year" ,Day: 365,Pwa: 18250,Pea: 35600,RentalFee: 36500},

	// }
	// for _, pkg := range Membership {
	// 	db.FirstOrCreate(&pkg,entity.Membership{PackageName: pkg.PackageName})
	// }
}
