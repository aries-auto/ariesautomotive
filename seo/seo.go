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
			path := req.URL.Path
			groute := Route{}

			switch path {
			case "/":
				groute.Name = "ARIES Automotive | Custom Truck, Jeep, and SUV Accessories | Main"
				groute.Body = template.HTML("")
				groute.Description = "From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle."
				groute.Keywords = "aries, automotive, truck, suv, jeep, accessories, custom"
				r.HTML(w, 200, "template", groute)
				break
			case "/about":
				groute.Name = "ARIES Automotive | About Us"
				groute.Body = template.HTML("")
				groute.Description = "Since 1997, ARIES has offered aftermarket truck and SUV accessories, including grille guards, bull bars, side bars, interior products and Jeep products."
				groute.Keywords = "aries, automotive, about"
				r.HTML(w, 200, "template", groute)
				break
			case "/appguides":
				groute.Name = "ARIES Automotive | Application Guides"
				groute.Body = template.HTML("")
				groute.Description = "From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle."
				groute.Keywords = "aries, automotive, applications, application guides, vehicles"
				r.HTML(w, 200, "template", groute)
				break
			case "/becomedealer":
				groute.Name = "ARIES Automotive | Become a Dealer | Become a Seller"
				groute.Body = template.HTML("")
				groute.Description = "For the retail store, distribution center and web retailer, ARIES has the marketing resources, technical support and order-fill rate to help you succeed."
				groute.Keywords = "aries, dealer, seller, automotive"
				r.HTML(w, 200, "template", groute)
				break
			case "/contact":
				groute.Name = "ARIES Automotive | Contact Us"
				groute.Body = template.HTML("")
				groute.Description = "Finding grille guards, bull bars, side bars and other ARIES parts for your vehicle is easy using the ARIES product search bar and part lookup tool."
				groute.Keywords = "aries, automotive, product search"
				r.HTML(w, 200, "template", groute)
				break
			case "/iconfig":
				groute.Name = "ARIES Automotive | IConfigurator"
				groute.Body = template.HTML("")
				groute.Description = "From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle."
				groute.Keywords = "aries, automotive, applications, fit your vehicle, vehicles"
				r.HTML(w, 200, "template", groute)
				break
			case "/techsupport":
				groute.Name = "ARIES Automotive | Technical Support"
				groute.Body = template.HTML("")
				groute.Description = "For questions about ARIES products, vehicle application or installation help, ARIES technical support can be reached by phone or email."
				groute.Keywords = "aries, automotive, technical support"
				r.HTML(w, 200, "template", groute)
				break
			case "/terms":
				groute.Name = "ARIES | Terms and Conditions | Return Policy | Warranty |Shipping"
				groute.Body = template.HTML("")
				groute.Description = "Read about ARIES terms and conditions, our return policy, shipping information, claims, pricing terms, and ARIES warranty information."
				groute.Keywords = "aries, terms, automotive"
				r.HTML(w, 200, "template", groute)
				break
			case "/vehicle/":
				groute.Name = "Automotive Accessories | Custom Fit | Vehicle Specific | ARIES"
				groute.Body = template.HTML("")
				groute.Description = "Many ARIES parts are made for a vehicle-specific fit. Look up your vehicle to find ARIES products that fit your specific year, make, model and submodel."
				groute.Keywords = "aries, custom fit, vehicle specific, automotive, accessories"
				r.HTML(w, 200, "template", groute)
				break
			case "/warranties":
				groute.Name = "ARIES Automotive | Warranty Registration"
				groute.Body = template.HTML("")
				groute.Description = "Register and submit an ARIES product warranty using your warranty card and proof of purchase. ARIES warranty submission can be online or through fax or email."
				groute.Keywords = "aries, warranty, automotive"
				r.HTML(w, 200, "template", groute)
				break
			case "/buy":
				groute.Name = "ARIES Automotive | Where to Buy"
				groute.Body = template.HTML("")
				groute.Description = "From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle."
				groute.Keywords = "aries, automotive, dealer locator, where to buy"
				r.HTML(w, 200, "template", groute)
				break
			default:
				break
			}

			continue
		}

		r.HTML(w, 200, "template", rte.Matcher.GetData(req))
	}
}

func Twitter(req *http.Request) {

}
