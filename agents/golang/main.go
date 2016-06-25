package main

import (
    "fmt"
    "net/http"
    "github.com/labstack/echo"
    "github.com/labstack/echo/engine/standard"
)

func main() {
  e := echo.New()
  e.POST("/", func(c echo.Context) error {
    json := c.FormValue("test")
    fmt.Println(json)
    return c.JSON(http.StatusOK, json)
  })
  e.Run(standard.New(":8001"))
}
