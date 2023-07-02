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

type VoxelRepo struct {
	Db *gorm.DB
}

func NewVoxelRepo(db *gorm.DB) *VoxelRepo {
	db.AutoMigrate(&model.Voxel{})
	return &VoxelRepo{Db: db}
}

// create Voxel
func (repository *VoxelRepo) CreateVoxel(c *gin.Context) {
	var Voxel model.Voxel
	c.BindJSON(&Voxel)
	err := model.CreateVoxel(repository.Db, &Voxel)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Voxel)
}

// get Voxels
func (repository *VoxelRepo) GetVoxels(c *gin.Context) {
	var Voxel []model.Voxel
	err := model.GetVoxels(repository.Db, &Voxel)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Voxel)
}

// get Voxel by id
func (repository *VoxelRepo) GetVoxel(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var Voxel model.Voxel
	err := model.GetVoxel(repository.Db, &Voxel, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Voxel)
}

// update Voxel
func (repository *VoxelRepo) UpdateVoxel(c *gin.Context) {
	var Voxel model.Voxel
	id, _ := strconv.Atoi(c.Param("id"))
	err := model.GetVoxel(repository.Db, &Voxel, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.BindJSON(&Voxel)
	err = model.UpdateVoxel(repository.Db, &Voxel)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, Voxel)
}

// delete Voxel
func (repository *VoxelRepo) DeleteVoxel(c *gin.Context) {
	var Voxel model.Voxel
	id, _ := strconv.Atoi(c.Param("id"))
	err := model.DeleteVoxel(repository.Db, &Voxel, id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Voxel deleted successfully"})
}
