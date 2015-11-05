package seo

import (
	"html/template"
	"net/http"
	"regexp"

	"github.com/unrolled/render"
)

var (
	routes = []Route{
		Route{
			Name:    "News",
			Pattern: "/news/*",
			Matcher: NewsMatcher{},
		},
		Route{
			Name:    "Part",
			Pattern: "/part/*",
			Matcher: PartMatcher{},
		},
		Route{
			Name:    "Category",
			Pattern: "/category/*",
			Matcher: CategoryMatcher{},
		},
		Route{
			Name:    "Vehicle",
			Pattern: "/vehicle/*",
			Matcher: VehicleMatcher{},
		},
		Route{
			Name:    "About",
			Pattern: "/about",
			Matcher: AboutMatcher{},
		},
		Route{
			Name:    "Appguides",
			Pattern: "/appguides",
			Matcher: AppMatcher{},
		},
		Route{
			Name:    "Dealer",
			Pattern: "/becomedealer",
			Matcher: DealerMatcher{},
		},
		Route{
			Name:    "Iconfig",
			Pattern: "/iconfig",
			Matcher: IconfigMatcher{},
		},
		Route{
			Name:    "Support",
			Pattern: "/techsupport",
			Matcher: SupportMatcher{},
		},
		Route{
			Name:    "Terms",
			Pattern: "/terms",
			Matcher: TermsMatcher{},
		},
		Route{
			Name:    "Warranties",
			Pattern: "/warranties",
			Matcher: WarrantiesMatcher{},
		},
		Route{
			Name:    "WhereToBuy",
			Pattern: "/buy",
			Matcher: BuyMatcher{},
		},
		Route{
			Name:    "Main",
			Pattern: "/",
			Matcher: MainMatcher{},
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
	Body        template.HTML
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

func Google(w http.ResponseWriter, req *http.Request) {
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
