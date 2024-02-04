package main

import (
	model "generator/model"
)

func renameIndex(config *model.Config, pageName string, listName *string) (string, string) {
	if pageName == "index" {

		if listName != nil {
			return "", getTitle(config, *listName)
		}

		return "/", "./"
	} else {
		return "/" + pageName, getTitle(config, pageName)
	}
}

func CreateSitemap(config *model.Config, elements []string, siteMap *model.SiteMap) {

	if len(elements) == 3 {

		file_without_extension := elements[2][0 : len(elements[2])-3]

		path, title := renameIndex(config, file_without_extension, nil)

		siteMap.Pages = append(siteMap.Pages, model.Page{
			Path:  path,
			Title: title,
		})
	} else if len(elements) == 4 {

		if _, ok := siteMap.Lists[elements[2]]; !ok {
			siteMap.Lists[elements[2]] = make([]model.Page, 0)
		}

		file_without_extension := elements[3][0 : len(elements[3])-3]

		contentName, title := renameIndex(config, file_without_extension, &elements[2])

		siteMap.Lists[elements[2]] = append(siteMap.Lists[elements[2]], model.Page{
			Path:  contentName,
			Title: title,
		})
	}
}
