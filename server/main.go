package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Starting ultr7a.com on port 3080")

	r := setupRouter()
	_ = r.Run(":3080")
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, "pong")
	})

	r.NoRoute(gin.WrapH(http.FileServer(http.Dir("../client/build"))))

	return r
}
