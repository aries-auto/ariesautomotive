package controllers

import (
	"net/http"

	"github.com/martini-contrib/render"
)

func Index(rw http.ResponseWriter, req *http.Request, bag map[string]interface{}, ren render.Render) {
	ren.HTML(200, "homepage", bag)
}

func AboutUs(rw http.ResponseWriter, req *http.Request, bag map[string]interface{}, ren render.Render) {
	ren.HTML(200, "aboutus", bag)
}

func ContactUs(rw http.ResponseWriter, req *http.Request, bag map[string]interface{}, ren render.Render) {
	ren.HTML(200, "contactus", bag)
}

func TechSupport(rw http.ResponseWriter, req *http.Request, bag map[string]interface{}, ren render.Render) {
	ren.HTML(200, "techsupport", bag)
}

func BecomeDealer(rw http.ResponseWriter, req *http.Request, bag map[string]interface{}, ren render.Render) {
	ren.HTML(200, "becomedealer", bag)
}

func AppGuides(rw http.ResponseWriter, req *http.Request, bag map[string]interface{}, ren render.Render) {
	ren.HTML(200, "appguides", bag)
}

func Warranties(rw http.ResponseWriter, req *http.Request, bag map[string]interface{}, ren render.Render) {
	ren.HTML(200, "warranties", bag)
}

func TermsAndConditions(rw http.ResponseWriter, req *http.Request, bag map[string]interface{}, ren render.Render) {
	ren.HTML(200, "terms", bag)
}
