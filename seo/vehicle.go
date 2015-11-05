package seo

import (
	"html/template"
	"net/http"
)

type VehicleMatcher struct{}

func (vm VehicleMatcher) GetData(req *http.Request) Route {
	r := Route{}

	r.Name = "Automotive Accessories | Custom Fit | Vehicle Specific | ARIES"
	r.Body = template.HTML("")
	r.Description = "Many ARIES parts are made for a vehicle-specific fit. Look up your vehicle to find ARIES products that fit your specific year, make, model and submodel."
	r.Keywords = "aries, custom fit, vehicle specific, automotive, accessories"

	return r
}
