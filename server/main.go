package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gorilla/websocket"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var upgrader = websocket.Upgrader{} // use default options
func socketAPI(c echo.Context) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	for {

		// Read
		_, msg, err := ws.ReadMessage()
		if err != nil {
			c.Logger().Error(err)
		}
		fmt.Printf("%s\n", msg)

		// get message type:
		messageTypeLen := int(msg[0])
		messageType := string(msg[1 : messageTypeLen+1])

		log.Printf("recv type: %s", messageType)
		switch messageType {
		case "chat":
			// get message content:
			messageContent := string(msg[messageTypeLen+1:])
			broadcastToAllPeers(c, ws, messageContent)
			log.Printf("chat message: %s", messageContent)

		case "telemetry":
			// get telemetry data:
			telemetryData := string(msg[messageTypeLen+1:])
			broadcastToAllPeers(c, ws, telemetryData)
		case "save_entity":
			// get entity data:
			// entityData := string(message[messageTypeLen+1:])
			// save entity data to database:
			// model.SaveEntity(db, entityData)

		}

	}
}

func broadcastToAllPeers(c echo.Context, ws *websocket.Conn, content string) {
	// Write
	err := ws.WriteMessage(websocket.TextMessage, []byte("Hello, Client!"))
	if err != nil {
		c.Logger().Error(err)
	}
}

// var db *gorm.DB

func main() {

	portStr := os.Getenv("PORT")

	if portStr == "" {
		// Handle the error if the conversion fails
		fmt.Println("Error converting PORT to an integer:")
		// Use a default port value or exit the program if necessary
	}

	e := echo.New()

	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root: "../client/build",
	}))

	// Serve the frontend
	e.GET("/", func(c echo.Context) error {
		return c.File("../client/build/index.html")
	})

	e.GET("/api/socket", socketAPI)

	// Start the server
	e.Start(":" + portStr)
	// db = database.InitDb()
}
