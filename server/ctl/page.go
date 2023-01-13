package ctl

// "gorm-test/database"
// "gorm-test/model"
import (
	"errors"

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	database "ultr7a.com/db"
	model "ultr7a.com/model"
)

type PageRepo struct {
	Db *gorm.DB
}

func NewPage() *PageRepo {
	db := database.InitDb()
	db.AutoMigrate(&model.Page{})
	return &PageRepo{Db: db}
}

// create Page
func (repository *PageRepo) CreatePage(c *gin.Context) {
	var Page model.Page
	c.BindJSON(&Page)
	err := model.CreatePage(repository.Db, &Page)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Page)
}

// get Pages
func (repository *PageRepo) GetPages(c *gin.Context) {
	var Page []model.Page
	err := model.GetPages(repository.Db, &Page)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Page)
}

// get Page by id
func (repository *PageRepo) GetPage(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var Page model.Page
	err := model.GetPage(repository.Db, &Page, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Page)
}

// update Page
func (repository *PageRepo) UpdatePage(c *gin.Context) {
	var Page model.Page
	id, _ := strconv.Atoi(c.Param("id"))
	err := model.GetPage(repository.Db, &Page, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.BindJSON(&Page)
	err = model.UpdatePage(repository.Db, &Page)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Page)
}

// delete Page
func (repository *PageRepo) DeletePage(c *gin.Context) {
	var Page model.Page
	id, _ := strconv.Atoi(c.Param("id"))
	err := model.DeletePage(repository.Db, &Page, id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Page deleted successfully"})
}
