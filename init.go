package ariesautomotive

import (
	"net/http"

	"github.com/unrolled/render"
)

func init() {

	r := render.New(render.Options{
		Directory:     "dist",            // Specify what path to load the templates from.
		Extensions:    []string{".html"}, // Specify extensions to load for templates.
		IsDevelopment: true,              // Render will now recompile the templates on every HTML response.
	})

	x := render.New(render.Options{
		Directory:     "dist",           // Specify what path to load the templates from.
		Extensions:    []string{".xml"}, // Specify extensions to load for templates.
		IsDevelopment: false,            // Render will now recompile the templates on every HTML response.
	})

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		r.HTML(w, 200, "index", nil)
	})

	mux.HandleFunc("/sitemap.xml", func(w http.ResponseWriter, req *http.Request) {
		x.HTML(w, 200, "sitemap", nil)
	})

	// Handle all requests using net/http
	http.Handle("/", mux)
}
