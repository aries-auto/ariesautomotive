package seo

import (
	"appengine"
	"appengine/urlfetch"
	"encoding/json"
	"fmt"
	"github.com/curt-labs/GoAPI/models/news"
	"html/template"
	"io/ioutil"
	"net/http"
	"strings"
)

type NewsMatcher struct {
}

func (n NewsMatcher) GetData(req *http.Request) Route {
	r := Route{}
	path := req.URL.Path

	path = strings.Replace(path, "/news/", "", 1)

	qry := fmt.Sprintf("%s/news/%s?key=%s", API_DOMAIN, path, KEY)

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

	var nws news_model.News
	err = json.Unmarshal(data, &nws)
	if err != nil {
		return r
	}

	r.Name = nws.Title
	r.Body = template.HTML(nws.Content)
	r.Description = nws.Lead
	r.Keywords = nws.Title + " " + nws.Lead
	for _, mt := range nws.Metadata {
		r.Metadata[mt.Type] = mt.Value
	}

	return r
}
