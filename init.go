package ariesautomotive

import (
	"net/http"
	"seo"
	"strings"

	"github.com/tampajohn/goprerender"
	"github.com/unrolled/render"
)

func init() {
	mux := http.NewServeMux()

	h := http.HandlerFunc(handler)
	mux.Handle("/", middle(h))

	// Handle all requests using net/http
	http.Handle("/", mux)
}

func handler(w http.ResponseWriter, req *http.Request) {

	r := render.New(render.Options{
		Directory:     "dist",            // Specify what path to load the templates from.
		Extensions:    []string{".html"}, // Specify extensions to load for templates.
		IsDevelopment: true,              // Render will now recompile the templates on every HTML response.
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		ua := req.UserAgent()
		if strings.Contains(ua, "facebookexternalhit/1.1") {
			seo.Facebook(w, req)
			return
		}

		r.HTML(w, 200, "index", nil)
	})
}
