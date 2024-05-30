package main

import (
	"fmt"
	model "generator/model"
)

// Makes index render as "/" or as "../"
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

func CreateSitemap(config *model.Config, input_root_elements_count int, elements []string, siteMap *model.SiteMap) {

	fmt.Println("Creating sitemap for", elements)

	if len(elements)-input_root_elements_count == 1 {

		file_name := elements[input_root_elements_count]
		// assume file extension like .md is always 3 characters:
		file_without_extension := file_name[0 : len(file_name)-3]

		path, title := renameIndex(config, file_without_extension, nil)

		siteMap.Pages = append(siteMap.Pages, model.Page{
			Path:  path,
			Title: title,
		})
	} else if len(elements)-input_root_elements_count == 2 {

		list_name := elements[input_root_elements_count]

		if _, ok := siteMap.Lists[list_name]; !ok {
			siteMap.Lists[list_name] = make([]model.Page, 0)
		}

		file_name := elements[input_root_elements_count+1]
		// assume file extension like .md is always 3 characters:
		file_without_extension := file_name[0 : len(elements[3])-3]

		contentName, title := renameIndex(config, file_without_extension, &list_name)

		siteMap.Lists[list_name] = append(siteMap.Lists[list_name], model.Page{
			Path:  contentName,
			Title: title,
		})
	}
}
