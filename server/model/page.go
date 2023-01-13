package model

import (
	"gorm.io/gorm"
)

type Page struct {
	gorm.Model
	ID       int
	URL      string
	Name     string
	Tags     []string
	Contents string
}

// create a Page
func CreatePage(db *gorm.DB, Page *Page) (err error) {
	err = db.Create(Page).Error
	if err != nil {
		return err
	}
	return nil
}

// get Pages
func GetPages(db *gorm.DB, Page *[]Page) (err error) {
	err = db.Find(Page).Error
	if err != nil {
		return err
	}
	return nil
}

// get Page by id
func GetPage(db *gorm.DB, Page *Page, id int) (err error) {
	err = db.Where("id = ?", id).First(Page).Error
	if err != nil {
		return err
	}
	return nil
}

// get Page by id
func GetPageByUrl(db *gorm.DB, Page *Page, url string) (err error) {
	err = db.Where("url = ?", url).First(Page).Error
	if err != nil {
		return err
	}
	return nil
}

// update Page
func UpdatePage(db *gorm.DB, Page *Page) (err error) {
	db.Save(Page)
	return nil
}

// delete Page
func DeletePage(db *gorm.DB, Page *Page, id int) (err error) {
	db.Where("id = ?", id).Delete(Page)
	return nil
}
