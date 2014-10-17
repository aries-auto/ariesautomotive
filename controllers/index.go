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
