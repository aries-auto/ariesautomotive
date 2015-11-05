package seo

import (
	"html/template"
	"net/http"
)

type IconfigMatcher struct{}

func (im IconfigMatcher) GetData(req *http.Request) Route {
	r := Route{}

	r.Name = "ARIES Automotive | IConfigurator"
	r.Body = template.HTML("")
	r.Description = "From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle."
	r.Keywords = "aries, automotive, applications, fit your vehicle, vehicles"

	return r
}
