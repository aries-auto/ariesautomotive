package index

import (
	"net/http"

	"github.com/martini-contrib/render"
)

func Index(rw http.ResponseWriter, req *http.Request, bag map[string]interface{}, ren render.Render) {
	ren.HTML(200, "homepage", bag)
}
