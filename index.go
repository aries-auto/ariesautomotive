package main

import (
	"flag"
	"log"
	"net/http"
	"time"

	"github.com/aries-auto/ariesautomotive/controllers"
	"github.com/aries-auto/ariesautomotive/helpers/funcmap"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

var (
	port = flag.String("port", "8000", "Port for the application to start on")
)

func main() {
	flag.Parse()

	m := martini.New()

	//middlewares
	m.Use(martini.Static("public"))
	m.Use(render.Renderer(render.Options{
		Directory:       "templates",
		Layout:          "layout",
		Extensions:      []string{".tmpl", ".html"},
		Funcs:           funcmap.FuncMap,
		Delims:          render.Delims{"{{", "}}"},
		Charset:         "UTF-8",
		IndentJSON:      true,
		HTMLContentType: "text/html",
	}))

	//routing
	r := martini.NewRouter()

	r.Get("/", controllers.Index)
	r.Get("/about", controllers.AboutUs)
	r.Get("/contact", controllers.ContactUs)
	r.Get("/techsupport", controllers.TechSupport)
	r.Get("/becomedealer", controllers.BecomeDealer)
	r.Get("/appguides", controllers.AppGuides)
	r.Get("/warranties", controllers.Warranties)
	r.Get("/terms", controllers.TermsAndConditions)

	m.Map(make(map[string]interface{}, 0))
	m.Action(r.Handle)

	srv := http.Server{
		Addr:           ":" + *port,
		Handler:        m,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Printf("Server started on :%s\n", *port)
	srv.ListenAndServe()
}
