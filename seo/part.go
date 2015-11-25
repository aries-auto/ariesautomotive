package seo

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/curt-labs/API/models/products"

	"appengine"
	"appengine/urlfetch"
)

type PartMatcher struct{}

func (p PartMatcher) GetData(req *http.Request) Route {
	r := Route{}
	path := req.URL.Path

	path = strings.Replace(path, "/part/", "", 1)

	qry := fmt.Sprintf("%s/part/old/%s?key=%s", API_DOMAIN, path, KEY)

	c := appengine.NewContext(req)
	resp, err := urlfetch.Client(c).Get(qry)
	if err != nil {
		return r
	}
	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return r
	}

	var part products.Part
	err = json.Unmarshal(data, &part)
	if err != nil {
		return r
	}

	r.Name = part.ShortDesc
	for _, con := range part.Content {
		if con.ContentType.AllowsHTML {
			r.Body = template.HTML(con.Text)
			break
		}
	}
	r.Description = part.ShortDesc
	r.Keywords = part.ShortDesc

	return r
}
