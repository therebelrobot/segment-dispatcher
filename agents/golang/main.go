package main

import (
    "net/http"
    "github.com/labstack/echo"
    "github.com/labstack/echo/engine/standard"
    "github.com/segmentio/analytics-go"
)

func main() {
  e := echo.New()
  e.POST("/", func(c echo.Context) error {
    writeKey := c.FormValue("writeKey")
    client := analytics.New(writeKey)
    client.Identify(&analytics.Identify{
      UserId: "12345",
      Traits: map[string]interface{}{
        "name": "Michael Bolton",
        "email": "mbolton@initech.com",
        "plan": "Enterprise",
        "friends": 42,
      },
    })
    return c.String(http.StatusOK, "A-ok!")
  })
  e.Run(standard.New(":8001"))
}
