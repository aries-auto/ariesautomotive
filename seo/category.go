package seo

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/curt-labs/GoAPI/models/products"

	"appengine"
	"appengine/urlfetch"
)

type CategoryMatcher struct{}

func (cm CategoryMatcher) GetData(req *http.Request) Route {
	r := Route{}
	path := req.URL.Path

	path = strings.Replace(path, "/category/", "", 1)

	qry := fmt.Sprintf("%s/category/%s?key=%s", API_DOMAIN, path, KEY)

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

	var cat products.Category
	err = json.Unmarshal(data, &cat)
	if err != nil {
		return r
	}

	r.Name = cat.ShortDesc
	for _, con := range cat.Content {
		if con.ContentType.Type == "CategoryContent" {
			r.Body = template.HTML(con.Text)
			break
		}
	}
	r.Description = cat.MetaDescription
	r.Keywords = cat.MetaKeywords

	return r
}
