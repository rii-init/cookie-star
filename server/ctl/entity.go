package ctl

// "gorm-test/database"
// "gorm-test/model"
import (
	"errors"

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	model "ultr7a.com/model"
)

type EntityRepo struct {
	Db *gorm.DB
}

func NewEntityRepo(db *gorm.DB) *EntityRepo {
	db.AutoMigrate(&model.Entity{})
	return &EntityRepo{Db: db}
}

// create Entity
func (repository *EntityRepo) CreateEntity(c *gin.Context) {
	var Entity model.Entity
	c.BindJSON(&Entity)
	err := model.CreateEntity(repository.Db, &Entity)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Entity)
}

// get Entitys
func (repository *EntityRepo) GetEntitys(c *gin.Context) {
	var Entity []model.Entity
	err := model.GetEntitys(repository.Db, &Entity)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Entity)
}

// get Entity by id
func (repository *EntityRepo) GetEntity(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var Entity model.Entity
	err := model.GetEntity(repository.Db, &Entity, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Entity)
}

// update Entity
func (repository *EntityRepo) UpdateEntity(c *gin.Context) {
	var Entity model.Entity
	id, _ := strconv.Atoi(c.Param("id"))
	err := model.GetEntity(repository.Db, &Entity, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.BindJSON(&Entity)
	err = model.UpdateEntity(repository.Db, &Entity)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Entity)
}

// delete Entity
func (repository *EntityRepo) DeleteEntity(c *gin.Context) {
	var Entity model.Entity
	id, _ := strconv.Atoi(c.Param("id"))
	err := model.DeleteEntity(repository.Db, &Entity, id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Entity deleted successfully"})
}
