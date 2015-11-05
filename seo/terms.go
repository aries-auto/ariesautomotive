package seo

import (
	"html/template"
	"net/http"
)

type TermsMatcher struct{}

func (tm TermsMatcher) GetData(req *http.Request) Route {
	r := Route{}

	r.Name = "ARIES | Terms and Conditions | Return Policy | Warranty |Shipping"
	r.Body = template.HTML("")
	r.Description = "Read about ARIES terms and conditions, our return policy, shipping information, claims, pricing terms, and ARIES warranty information."
	r.Keywords = "aries, terms, automotive"

	return r
}
