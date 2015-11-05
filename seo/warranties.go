package seo

import (
	"html/template"
	"net/http"
)

type WarrantiesMatcher struct{}

func (wm WarrantiesMatcher) GetData(req *http.Request) Route {
	r := Route{}

	r.Name = "ARIES Automotive | Warranty Registration"
	r.Body = template.HTML("")
	r.Description = "Register and submit an ARIES product warranty using your warranty card and proof of purchase. ARIES warranty submission can be online or through fax or email."
	r.Keywords = "aries, warranty, automotive"

	return r
}
