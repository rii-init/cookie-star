package main

import (
	"log"

	"net/http"

	"github.com/gorilla/websocket"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
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

	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root: "../client/build",
	}))

	// Serve the frontend
	e.GET("/", func(c echo.Context) error {
		return c.File("../client/build/index.html")
	})

	// Start the server
	e.Start(":3080")
	// db = database.InitDb()

}
