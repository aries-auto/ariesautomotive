package funcmap

import (
	"html/template"
	"time"
)

var (
	FuncMap = []template.FuncMap{
		{"CurrentYear": getCurrentYear},
	}
)

func getCurrentYear() int {
	return time.Now().Year()
}
