package ariesautomotive

import (
	"net/http"
	"net/url"
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
	r.HTML(w, 200, "index", nil)
}

// Prerenderer  Middleware
// https://prerender.io/documentation
// git clone https://github.com/prerender/prerender.git
// cd prerender
// npm install
// node server.js
// View Prerendered pages at: http://localhost:3000/https://www.your-url.com/ -or- http://service.prerender.io/https://www.your-url.com/
func middle(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		var err error
		prerenderService := "https://service.prerender.io/"
		if strings.Contains(req.Host, "localhost") {
			prerenderService = "http://localhost:3000" //testing
		}

		o := prerender.NewOptions()
		o.PrerenderURL, err = url.Parse(prerenderService) //testing only
		if err != nil {
			next.ServeHTTP(w, req)
		}
		o.NewPrerender()

		next.ServeHTTP(w, req)
	})
}
