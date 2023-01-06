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

type UwURepo struct {
	Db *gorm.DB
}

func New() *UwURepo {
	db := database.InitDb()
	db.AutoMigrate(&model.UwU{})
	return &UwURepo{Db: db}
}

// create UwU
func (repository *UwURepo) CreateUwU(c *gin.Context) {
	var UwU model.UwU
	c.BindJSON(&UwU)
	err := model.CreateUwU(repository.Db, &UwU)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, UwU)
}

// get UwUs
func (repository *UwURepo) GetUwUs(c *gin.Context) {
	var UwU []model.UwU
	err := model.GetUwUs(repository.Db, &UwU)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, UwU)
}

// get UwU by id
func (repository *UwURepo) GetUwU(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var UwU model.UwU
	err := model.GetUwU(repository.Db, &UwU, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, UwU)
}

// update UwU
func (repository *UwURepo) UpdateUwU(c *gin.Context) {
	var UwU model.UwU
	id, _ := strconv.Atoi(c.Param("id"))
	err := model.GetUwU(repository.Db, &UwU, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.BindJSON(&UwU)
	err = model.UpdateUwU(repository.Db, &UwU)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, UwU)
}

// delete UwU
func (repository *UwURepo) DeleteUwU(c *gin.Context) {
	var UwU model.UwU
	id, _ := strconv.Atoi(c.Param("id"))
	err := model.DeleteUwU(repository.Db, &UwU, id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "UwU deleted successfully"})
}
