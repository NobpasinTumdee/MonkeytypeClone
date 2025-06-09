package main

import (
	"net/http"
	"typetype/config"
	"typetype/controller/user"
	"typetype/middlewares"

	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main()  {
	config.ConnectionDB()
	config.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	r.GET("/users",user.ListUsers)
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})
	r.Run("localhost:" + PORT)

	router := r.Group("") 
	{
		router.Use(middlewares.Authorizes())
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}