package ctl

// "gorm-test/database"
// "gorm-test/model"
import (
	"net/http"

	model "server/model"

	"github.com/labstack/echo"
	"gorm.io/gorm"
)

type EntityRepo struct {
	Db *gorm.DB
}

func NewEntityRepo(db *gorm.DB) *EntityRepo {
	db.AutoMigrate(&model.Entity{})
	return &EntityRepo{Db: db}
}

// create Entity
func (repository *EntityRepo) CreateEntity(c echo.Context) {
	Entity := model.Entity{}
	err := c.Bind(&Entity)
	if err != nil {
		c.Error(err)
		return
	}
	err = model.CreateEntity(repository.Db, &Entity)
	if err != nil {
		c.Error(err)
		return
	}
	c.JSON(http.StatusOK, Entity)
}

// get Entitys
func (repository *EntityRepo) GetEntitys(c echo.Context) {

}

// get Entity by id
func (repository *EntityRepo) GetEntity(c echo.Context) {

}

// update Entity
func (repository *EntityRepo) UpdateEntity(c echo.Context) {

}

// delete Entity
func (repository *EntityRepo) DeleteEntity(c echo.Context) {

}
