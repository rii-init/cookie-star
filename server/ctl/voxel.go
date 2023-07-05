package ctl

// "gorm-test/database"
// "gorm-test/model"
import (
	"errors"

	"net/http"
	"strconv"

	model "server/model"

	"github.com/labstack/echo"
	"gorm.io/gorm"
)

type VoxelRepo struct {
	Db *gorm.DB
}

func NewVoxelRepo(db *gorm.DB) *VoxelRepo {
	db.AutoMigrate(&model.Voxel{})
	return &VoxelRepo{Db: db}
}

// create Voxel
func (repository *VoxelRepo) CreateVoxel(c echo.Context) {
	Voxel := model.Voxel{}
	err := c.Bind(&Voxel)
	if err != nil {
		c.Error(err)
		return
	}
	err = model.CreateVoxel(repository.Db, &Voxel)
	if err != nil {
		c.Error(err)
		return
	}
	c.JSON(http.StatusOK, Voxel)
}

// get Voxels
func (repository *VoxelRepo) GetVoxels(c echo.Context) {
	var Voxel []model.Voxel
	err := model.GetVoxels(repository.Db, &Voxel)
	if err != nil {
		c.Error(err)
		return
	}
	c.JSON(http.StatusOK, Voxel)
}

// get Voxel by id
func (repository *VoxelRepo) GetVoxel(c echo.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var Voxel model.Voxel
	err := model.GetVoxel(repository.Db, &Voxel, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.Error(err)
			return
		}

		c.Error(err)
		return
	}
	c.JSON(http.StatusOK, Voxel)
}

// update Voxel
func (repository *VoxelRepo) UpdateVoxel(c echo.Context) {
	var Voxel model.Voxel
	id, _ := strconv.Atoi(c.Param("id"))
	err := model.GetVoxel(repository.Db, &Voxel, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.Error(err)
			return
		}

		c.Error(err)
		return
	}
	err = c.Bind(&Voxel)
	if err != nil {
		c.Error(err)
		return
	}

	err = model.UpdateVoxel(repository.Db, &Voxel)
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, nil)
}

// delete Voxel
func (repository *VoxelRepo) DeleteVoxel(c echo.Context) {
	var Voxel model.Voxel
	id, _ := strconv.Atoi(c.Param("id"))
	err := model.DeleteVoxel(repository.Db, &Voxel, id)
	if err != nil {
		c.Error(err)
		return
	}
}
