package seo

import (
	"html/template"
	"net/http"
)

type SupportMatcher struct{}

func (sm SupportMatcher) GetData(req *http.Request) Route {
	r := Route{}

	r.Name = "ARIES Automotive | Technical Support"
	r.Body = template.HTML("")
	r.Description = "For questions about ARIES products, vehicle application or installation help, ARIES technical support can be reached by phone or email."
	r.Keywords = "aries, automotive, technical support"

	return r
}
