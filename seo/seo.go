package seo

import (
	"github.com/unrolled/render"
	"net/http"
	"regexp"
)

var (
	routes = []Route{
		Route{
			Name:    "News",
			Pattern: "/news/*",
			Matcher: NewsMatcher{},
		},
	}
	r = render.New(render.Options{
		Directory:     "seo",             // Specify what path to load the templates from.
		Extensions:    []string{".html"}, // Specify extensions to load for templates.
		IsDevelopment: true,              // Render will now recompile the templates on every HTML response.
	})
)

type Route struct {
	Name        string
	Description string
	Path        string
	Pattern     string
	Method      string
	Metadata    map[string]string
	Body        string
	Keywords    string
	Matcher     RouteMatcher
}

func Facebook(w http.ResponseWriter, req *http.Request) {
	for _, rte := range routes {
		match, err := regexp.MatchString(rte.Pattern, req.URL.Path)
		if !match || err != nil {
			continue
		}

		r.HTML(w, 200, "template", rte.Matcher.GetData(req))

	}
}

func Twitter(req *http.Request) {

}
