package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const DB_HOST = "127.0.0.1"

var (
	default_db_port = "3306"
)

var Db *gorm.DB

func InitDb(UwU_name string, password string, db_name string, db_port string) *gorm.DB {
	Db = connectDB(UwU_name, password, db_name, db_port)

	return Db
}

func connectDB(UwU_name string, password string, db_name string, db_port string) *gorm.DB {

	if db_name != "" && UwU_name != "" && password != "" {
		var err error

		if db_port == "" {
			default_db_port = db_port
		}

		dsn := UwU_name + ":" + password + "@tcp" + "(" + DB_HOST + ":" + db_port + ")/" + db_name + "?" + "parseTime=true&loc=Local"
		fmt.Println("dsn : ", dsn)
		db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

		if err != nil {
			fmt.Println("Error connecting to database : error=%v", err)
			return nil
		}

		return db
	}

	return nil

}
