package seo

import (
	"net/http"
)

const (
	KEY        = "883d4046-8b96-11e4-9475-42010af00d4e"
	API_DOMAIN = "http://api.curtmfg.com/v3"
)

type RouteMatcher interface {
	GetData(*http.Request) Route
}
