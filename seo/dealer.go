package seo

import (
	"html/template"
	"net/http"
)

type DealerMatcher struct{}

func (dm DealerMatcher) GetData(req *http.Request) Route {
	r := Route{}

	r.Name = "ARIES Automotive | Become a Dealer | Become a Seller"
	r.Body = template.HTML("")
	r.Description = "For the retail store, distribution center and web retailer, ARIES has the marketing resources, technical support and order-fill rate to help you succeed."
	r.Keywords = "aries, dealer, seller, automotive"

	return r
}
