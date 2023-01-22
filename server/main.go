package main

import (
	"bytes"
	"log"
	"os"

	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	database "ultr7a.com/db"
	model "ultr7a.com/model"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{} // use default options

func socketAPI(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}

		// get message type:
		messageTypeLen := int(message[0])
		messageType := string(message[1 : messageTypeLen+1])
		log.Printf("recv type: %s", messageType)
		switch messageType {
		case "chat":
			// get message content:
			messageContent := string(message[messageTypeLen+1:])
			log.Printf("chat message: %s", messageContent)

		case "telemetry":
			// get telemetry data:
			telemetryData := string(message[messageTypeLen+1:])
			log.Printf("telemetry data: %s", telemetryData)

		}

		err = c.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}

var db *gorm.DB

func main() {
	fmt.Println("Starting ultr7a.com on port 3080")

	db = database.InitDb()

	r := setupRouter()
	_ = r.Run(":3080")
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	// Get pages as json data:
	r.GET("/api/pages", func(c *gin.Context) {
		pages := []model.Page{}

		model.GetPages(db, &pages)

		c.JSON(http.StatusOK, gin.H{
			"pages": pages,
		})
	})

	// Get page by url as json data:
	r.GET("/api/page/:url", func(c *gin.Context) {
		url := c.Param("url")
		page := model.Page{}

		model.GetPageByUrl(db, &page, url)

		c.JSON(http.StatusOK, gin.H{
			"page": page,
		})
	})

	r.GET("/api/socket", gin.WrapF(socketAPI))

	r.POST("/api/dev-console", func(c *gin.Context) {
		// print out the request body:
		log.Println(c.Request.Body)
		// write the response into a file in append mode
		f, err := os.OpenFile("journal/owo.pages", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			log.Println(err) // 0w0 ..What's dis?
		}
		defer f.Close()

		buf := new(bytes.Buffer)
		buf.ReadFrom(c.Request.Body)

		if _, err := f.WriteString(buf.String()); err != nil {
			log.Println(err)
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "ok",
		})

	})

	r.NoRoute(gin.WrapH(http.FileServer(http.Dir("../client/build"))))

	return r
}
