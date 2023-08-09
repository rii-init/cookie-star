package main

import (
	model "compiler/model"
)

func renameIndex(pageName string) (string, string) {
	if pageName == "index" {
		return "/", "./"
	} else {
		return pageName, getTitle(pageName)
	}
}

func CreateSitemap(elements []string, siteMap *model.SiteMap) {

	if len(elements) == 3 {

		file_without_extension := elements[2][0 : len(elements[2])-3]

		Path, Title := renameIndex(file_without_extension)

		siteMap.Pages = append(siteMap.Pages, model.Page{
			Path:  Path,
			Title: Title,
		})
	} else if len(elements) == 4 {

		if _, ok := siteMap.Lists[elements[2]]; !ok {
			siteMap.Lists[elements[2]] = make([]model.Page, 0)
		}

		file_without_extension := elements[3][0 : len(elements[3])-3]

		Path, Title := renameIndex(file_without_extension)

		siteMap.Lists[elements[2]] = append(siteMap.Lists[elements[2]], model.Page{
			Path:  Path,
			Title: Title,
		})
	}
}
