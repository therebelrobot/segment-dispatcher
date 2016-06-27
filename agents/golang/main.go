package main

import (
    "fmt"
    // "strings"
    "net/http"
    "encoding/json"
    "github.com/labstack/echo"
    "github.com/labstack/echo/engine/standard"
    "github.com/segmentio/analytics-go"
)

func main() {
  e := echo.New()
  e.POST("/", func(c echo.Context) error {
    writeKey := c.FormValue("writeKey")
    client := analytics.New(writeKey)
    sentJson := c.FormValue("data")
    var f interface{}
    err := json.Unmarshal(sentJson, &f)
    // json = j.Unmarshal(json)
    // type := strings.Title(json.type)
    client.Identify(&analytics.Identify{
      UserId: sentJson.userId,
      Traits: map[string]interface{}{
        "name": "Michael Bolton",
        "email": "mbolton@initech.com",
        "plan": "Enterprise",
        "friends": 42,
      },
    })
    fmt.Println(sentJson)
    return c.JSON(http.StatusOK, sentJson)
  })
  e.Run(standard.New(":8001"))
}
