package seo

import (
	"net/http"
)

const (
	KEY = "883d4046-8b96-11e4-9475-42010af00d4e"
)

type RouteMatcher interface {
	GetData(*http.Request) Route
}