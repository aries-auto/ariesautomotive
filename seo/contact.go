package seo

import (
	"html/template"
	"net/http"
)

type ContactMatcher struct{}

func (cm ContactMatcher) GetData(req *http.Request) Route {
	r := Route{}

	r.Name = "ARIES Automotive | Contact Us"
	r.Body = template.HTML("")
	r.Description = "Finding grille guards, bull bars, side bars and other ARIES parts for your vehicle is easy using the ARIES product search bar and part lookup tool."
	r.Keywords = "aries, automotive, product search"

	return r
}
