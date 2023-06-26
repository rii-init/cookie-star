package main

import (
	"log"
	"os"
	"path"

	"net/http"

	"github.com/gorilla/websocket"

	"github.com/labstack/echo"
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
	e := echo.New()

	// Serve the frontend
	e.GET("/", func(c echo.Context) error {
		return c.File("../client/build/index.html")
	})

	// Custom route handler for serving index.html for requested folders
	e.GET("/*", func(c echo.Context) error {
		// Get the requested path
		reqPath := c.Request().URL.Path

		// Check if the requested path is a directory
		if info, err := os.Stat("../client/build" + reqPath); err == nil && info.IsDir() {
			// Construct the full path to index.html
			indexFilePath := path.Join("../client/build"+reqPath, "index.html")

			// Check if index.html exists
			if _, err := os.Stat(indexFilePath); err == nil {
				// Serve index.html
				return c.File(indexFilePath)
			}
		}

		// Serve the requested file or directory using the built-in Echo handler
		return echo.WrapHandler(http.FileServer(http.Dir("../client/build")))(c)
	})

	// Start the server
	e.Start(":3080")
	// db = database.InitDb()

}
