package model

import (
	"gorm.io/gorm"
)

type Entity struct {
	gorm.Model
	ID       int
	URL      string
	Name     string
	Tags     []string
	Contents string
}

// create a Entity
func CreateEntity(db *gorm.DB, Entity *Entity) (err error) {
	err = db.Create(Entity).Error
	if err != nil {
		return err
	}
	return nil
}

// get Entitys
func GetEntitys(db *gorm.DB, Entity *[]Entity) (err error) {
	err = db.Find(Entity).Error
	if err != nil {
		return err
	}
	return nil
}

// get Entity by id
func GetEntity(db *gorm.DB, Entity *Entity, id int) (err error) {
	err = db.Where("id = ?", id).First(Entity).Error
	if err != nil {
		return err
	}
	return nil
}

// get Entity by id
func GetEntityByName(db *gorm.DB, Entity *Entity, name string) (err error) {
	err = db.Where("name = ?", name).First(Entity).Error
	if err != nil {
		return err
	}
	return nil
}

// update Entity
func UpdateEntity(db *gorm.DB, Entity *Entity) (err error) {
	db.Save(Entity)
	return nil
}

// delete Entity
func DeleteEntity(db *gorm.DB, Entity *Entity, id int) (err error) {
	db.Where("id = ?", id).Delete(Entity)
	return nil
}
