package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct { //Verified
	gorm.Model
	UserName      string    `json:"user_name"`
	Password      string    `json:"password"`
	Email         string    `json:"email"`
	Picture       string    `json:"picture"`
	Level         uint      `json:"level"`
	TestCompleted uint      `json:"test_completed"`
	DayStart      time.Time `json:"day_start"`

	// บอกว่าอีกตารางจะให้ pk เราชื่ออะไร
	HistoryType []HistoryType `gorm:"foreignKey:user_id"`
	PlayerScore []PlayerScore `gorm:"foreignKey:user_id"`
}

type PlayerScore struct { //Verified
	gorm.Model
	AccScore uint `json:"acc_score"`
	WpmScore uint `json:"wpm_score"`
	TimeStamp time.Time `json:"time_stamp"`

	// ForeignKey
	UserID    uint      `json:"user_id"`
	User      User      `gorm:"foreignKey:user_id"`
	ModeID    uint      `json:"mode_id"`
	ModeWords ModeWords `gorm:"foreignKey:mode_id"`
}

type HistoryType struct { //Verified
	gorm.Model
	Wpm      uint      `json:"wpm"`
	Accuracy uint      `json:"accuracy"`
	Chars    uint      `json:"chars"`
	DateTime time.Time `json:"date_time"`

	// ForeignKey
	UserID    uint      `json:"user_id"`
	User      User      `gorm:"foreignKey:user_id"`
	ModeID    uint      `json:"mode_id"`
	ModeWords ModeWords `gorm:"foreignKey:mode_id"`

	AllWord []AllWord `gorm:"foreignKey:history_id"`
}

type ModeWords struct { //Verified
	gorm.Model
	NameMode string `json:"name_mode"`
	Total    uint   `json:"total"`

	HistoryType []HistoryType `gorm:"foreignKey:mode_id"`
	PlayerScore []PlayerScore `gorm:"foreignKey:mode_id"`
}

type AllWord struct { //Verified
	gorm.Model

	// ForeignKey
	HistoryID   uint        `json:"history_id"`
	HistoryType HistoryType `gorm:"foreignKey:history_id"`
	WordID      uint        `json:"word_id"`
	Words       Words       `gorm:"foreignKey:word_id"`
}

type Words struct { //Verified
	gorm.Model
	Word string `json:"word"`

	// ForeignKey
	LanguageID uint     `json:"language_id"`
	Language   Language `gorm:"foreignKey:language_id"`

	AllWord []AllWord `gorm:"foreignKey:word_id"`
}

type Language struct { //Verified
	gorm.Model
	TextLanguage string `json:"text_language"`

	Words []Words `gorm:"foreignKey:language_id"`
}
