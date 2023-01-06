package model

import (
	"gorm.io/gorm"
)

type UwU struct {
	gorm.Model
	ID    int
	Name  string
	Email string
}

// create a UwU
func CreateUwU(db *gorm.DB, UwU *UwU) (err error) {
	err = db.Create(UwU).Error
	if err != nil {
		return err
	}
	return nil
}

// get UwUs
func GetUwUs(db *gorm.DB, UwU *[]UwU) (err error) {
	err = db.Find(UwU).Error
	if err != nil {
		return err
	}
	return nil
}

// get UwU by id
func GetUwU(db *gorm.DB, UwU *UwU, id int) (err error) {
	err = db.Where("id = ?", id).First(UwU).Error
	if err != nil {
		return err
	}
	return nil
}

// update UwU
func UpdateUwU(db *gorm.DB, UwU *UwU) (err error) {
	db.Save(UwU)
	return nil
}

// delete UwU
func DeleteUwU(db *gorm.DB, UwU *UwU, id int) (err error) {
	db.Where("id = ?", id).Delete(UwU)
	return nil
}
