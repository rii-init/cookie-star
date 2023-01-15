package model

import (
	"gorm.io/gorm"
)

type Voxel struct {
	gorm.Model
	ID       int
	URL      string
	Name     string
	Tags     []string
	Contents string
}

// create a Voxel
func CreateVoxel(db *gorm.DB, Voxel *Voxel) (err error) {
	err = db.Create(Voxel).Error
	if err != nil {
		return err
	}
	return nil
}

// get Voxels
func GetVoxels(db *gorm.DB, Voxel *[]Voxel) (err error) {
	err = db.Find(Voxel).Error
	if err != nil {
		return err
	}
	return nil
}

// get Voxel by id
func GetVoxel(db *gorm.DB, Voxel *Voxel, id int) (err error) {
	err = db.Where("id = ?", id).First(Voxel).Error
	if err != nil {
		return err
	}
	return nil
}

// get Voxel by id
func GetVoxelByUrl(db *gorm.DB, Voxel *Voxel, url string) (err error) {
	err = db.Where("url = ?", url).First(Voxel).Error
	if err != nil {
		return err
	}
	return nil
}

// update Voxel
func UpdateVoxel(db *gorm.DB, Voxel *Voxel) (err error) {
	db.Save(Voxel)
	return nil
}

// delete Voxel
func DeleteVoxel(db *gorm.DB, Voxel *Voxel, id int) (err error) {
	db.Where("id = ?", id).Delete(Voxel)
	return nil
}
