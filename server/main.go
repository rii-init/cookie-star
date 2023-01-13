package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	database "ultr7a.com/db"
	model "ultr7a.com/model"
)

var db *gorm.DB

func main() {
	fmt.Println("Starting ultr7a.com on port 3080")

	db = database.InitDb()

	r := setupRouter()
	_ = r.Run(":3080")
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	// Get pages as json data:
	r.GET("/pages", func(c *gin.Context) {
		pages := []model.Page{}

		model.GetPages(db, &pages)

		c.JSON(http.StatusOK, gin.H{
			"pages": pages,
		})
	})

	// Get page by url as json data:
	r.GET("/page/:url", func(c *gin.Context) {
		url := c.Param("url")
		page := model.Page{}

		model.GetPageByUrl(db, &page, url)

		c.JSON(http.StatusOK, gin.H{
			"page": page,
		})
	})

	r.NoRoute(gin.WrapH(http.FileServer(http.Dir("../client/build"))))

	return r
}
