package model

type SiteMap struct {
	Pages []Page            `json:"pages"`
	Lists map[string][]Page `json:"lists"`
}
