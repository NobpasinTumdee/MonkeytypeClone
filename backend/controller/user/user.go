package user
import (
	"net/http"
	"github.com/gin-gonic/gin"
	"typetype/entity"
	"typetype/config"
)

// GET /users
func ListUsers(c *gin.Context) {
	var users []entity.User
	db := config.DB()
	results := db.Select("id,user_name,password,email,picture,level,test_completed,day_start").Find(&users)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, users)
}