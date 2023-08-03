package main

import (
	model "compiler/model"
	"fmt"
)

func CreateSitemap(elements []string, siteMap *model.SiteMap) {
	if len(elements) == 3 {

		fmt.Println("elements[2]", elements[2])
		file_without_extension := elements[2][0 : len(elements[2])-3]

		page := model.Page{
			Path:  file_without_extension,
			Title: getTitle(file_without_extension),
		}

		fmt.Println("page", page.Title)

		siteMap.Pages = append(siteMap.Pages, page)
	} else if len(elements) == 4 {

		if _, ok := siteMap.Lists[elements[2]]; !ok {
			siteMap.Lists[elements[2]] = make([]model.Page, 0)
		}

		file_without_extension := elements[3][0 : len(elements[3])-3]

		page := model.Page{
			Path:  file_without_extension,
			Title: getTitle(file_without_extension),
		}

		siteMap.Lists[elements[2]] = append(siteMap.Lists[elements[2]], page)
	}
}
