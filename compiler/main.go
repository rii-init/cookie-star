package main

import (
	"bufio"
	model "compiler/model"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func writeSiteMap(siteMap model.SiteMap, path string) {
	// Open a file for writing
	fo, err := os.Create(path)
	if err != nil {
		panic(err)
	}
	defer fo.Close()

	// Create a new json encoder
	e := json.NewEncoder(fo)

	// Encode the data
	err = e.Encode(siteMap)
	if err != nil {
		panic(err)
	}
}

func getTitle(path string) string {
	// read file and get first line:
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Create a new scanner to read the file
	scanner := bufio.NewScanner(file)

	// Scan for the first line
	if scanner.Scan() {
		firstLine := scanner.Text()

		return strings.ReplaceAll(firstLine, "#", "")
	}

	return path
}

func main() {
	fmt.Println("[rendering markdown, and creating sitemap.json]")

	root := "../surface"

	siteMap := model.SiteMap{
		Pages: make([]model.Page, 0),
		Lists: make(map[string][]model.Page),
	}

	err := filepath.WalkDir(root, func(path string, info os.DirEntry, err error) error {
		// Initialize an empty dynamic list of strings

		if err != nil {
			fmt.Printf("Error accessing path %s: %v\n", path, err)
			return err
		}

		if info.IsDir() {
			fmt.Printf("Directory: %s\n", path)

		} else {
			fmt.Printf("File: %s\n", path)

			if filepath.Ext(path) == ".html" {
				elements := strings.Split(path, "/")

				if len(elements) == 3 {

					file_without_extension := elements[2][0 : len(elements[2])-5]

					page := model.Page{
						Path:  file_without_extension,
						Title: getTitle(path),
					}

					siteMap.Pages = append(siteMap.Pages, page)
				} else if len(elements) == 4 {

					if _, ok := siteMap.Lists[elements[2]]; !ok {
						siteMap.Lists[elements[2]] = make([]model.Page, 0)
					}

					file_without_extension := elements[3][0 : len(elements[3])-5]

					page := model.Page{
						Path:  file_without_extension,
						Title: getTitle(path),
					}

					siteMap.Lists[elements[2]] = append(siteMap.Lists[elements[2]], page)
				}
			}
		}

		return nil
	})

	if err != nil {
		fmt.Printf("Error walking the path %s: %v\n", root, err)
	}

	// write SiteMap to ../surface/sitemap.json and ../client/src/sitemap.json

	// Open a file for writing

	writeSiteMap(siteMap, "../surface/sitemap.json")
	writeSiteMap(siteMap, "../client/src/sitemap.json")

}
