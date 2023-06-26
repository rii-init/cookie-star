package main

import (
	"bytes"
	"log"
	"os"
	"path/filepath"
	"strings"

	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

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
			// telemetryData := string(message[messageTypeLen+1:])
		case "save_entity":
			// get entity data:
			// entityData := string(message[messageTypeLen+1:])
			// save entity data to database:
			// model.SaveEntity(db, entityData)

		}

		err = c.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}

// var db *gorm.DB

func main() {
	fmt.Println("Starting ultr7a.com on port 3080")

	// db = database.InitDb()

	r := setupRouter()
	_ = r.Run(":3080")
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(IndexHTMLHandler())

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

		if _, err := f.WriteString(buf.String() + ",\n"); err != nil {
			log.Println(err)
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "ok",
		})

	})

	r.NoRoute(gin.WrapH(http.FileServer(http.Dir("../client/build"))))

	return r
}

// IndexHTMLHandler is a custom middleware that serves index.html inside the requested path without a trailing slash
func IndexHTMLHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestPath := c.Request.URL.Path

		// Check if the request path ends with a trailing slash
		requestPath = strings.TrimSuffix(requestPath, "/")
		indexDirPath := filepath.Join("../client/build", requestPath)

		fmt.Println("Index DIR: " + indexDirPath)
		// Check if the path corresponds to a directory
		if fileInfo, err := os.Stat(indexDirPath); err == nil && fileInfo.IsDir() {
			// Serve the index.html file inside the directory
			indexFilePath := filepath.Join(indexDirPath, "index.html")

			fmt.Println("Index File: " + indexFilePath)

			if _, err := os.Stat(indexFilePath); err == nil {
				c.File(indexFilePath)
				c.Abort()
				return
			}
		}

		// Continue to the next middleware or route handler
		c.Next()
	}
}
