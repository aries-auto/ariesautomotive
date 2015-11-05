package seo

import (
	"html/template"
	"net/http"
)

type BuyMatcher struct{}

func (bm BuyMatcher) GetData(req *http.Request) Route {
	r := Route{}

	r.Name = "ARIES Automotive | Where to Buy"
	r.Body = template.HTML("")
	r.Description = "From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle."
	r.Keywords = "aries, automotive, dealer locator, where to buy"

	return r
}
