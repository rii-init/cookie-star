package main

import (
	"bufio"
	model "compiler/model"
	"compiler/util"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	cp "github.com/otiai10/copy"
)

func writeSiteMap(siteMap model.SiteMap, path string) {
	// Open a file for writing
	fo, err := os.Create(path)
	if err != nil {
		panic(err)
	}
	defer fo.Close()

	// encode json into a string first
	jsonString, err := json.MarshalIndent(siteMap, "", "  ")

	if err != nil {
		panic(err)
	}

	// add export const siteMap = to the beginning of the string
	jsonString = []byte("export const siteMap = " + string(jsonString))

	// write to file
	fo.Write(jsonString)
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
		afterHeading := strings.ReplaceAll(firstLine, "#", "")

		// check if left brace exists:
		if strings.Contains(afterHeading, "{") {
			// get everything before the left brace
			return strings.Split(afterHeading, "{")[0]
		}

		return afterHeading
	}

	return path
}

func main() {

	file_root := "../"
	input_root := file_root + "content"
	output_root := file_root + "surface"

	mode := "create-sitemap"
	// check command line params:
	if len(os.Args) > 1 {
		mode = os.Args[1]
		fmt.Println("mode: " + mode)
		fmt.Println("[rendering markdown]")
	} else {
		fmt.Println("[creating sitemap]")
	}

	siteMap := model.SiteMap{
		Pages: make([]model.Page, 0),
		Lists: make(map[string][]model.Page),
	}

	// make sure ./index.js exists
	if _, err := os.Stat("./ts/index.js"); os.IsNotExist(err) {
		fmt.Println("compiler/ts/index.js missing; run `npm install` in compiler directory")
		os.Exit(1)
	}

	err := filepath.WalkDir(input_root, func(path string, info os.DirEntry, err error) error {
		// Inijsonialize an empty dynamic list of strings

		if err != nil {
			fmt.Printf("Error accessing path %s: %v\n", path, err)
			return err
		}

		if !info.IsDir() {

			// only process markdown files that are not hidden
			if path[len(input_root)+1] != byte('.') && filepath.Ext(path) == ".md" {

				fmt.Printf("File: %s\n", path)
				elements := strings.Split(path, "/")

				if len(elements) == 3 {

					file_without_extension := elements[2][0 : len(elements[2])-3]

					page := model.Page{
						Path:  file_without_extension,
						Title: getTitle(path),
					}

					siteMap.Pages = append(siteMap.Pages, page)
				} else if len(elements) == 4 {

					if _, ok := siteMap.Lists[elements[2]]; !ok {
						siteMap.Lists[elements[2]] = make([]model.Page, 0)
					}

					file_without_extension := elements[3][0 : len(elements[3])-3]

					page := model.Page{
						Path:  file_without_extension,
						Title: getTitle(path),
					}

					siteMap.Lists[elements[2]] = append(siteMap.Lists[elements[2]], page)
				}

				// join elements with "/" and remove last 3 characters (.md)
				output_path := output_root + "/" + strings.Join(elements, "/")[len(input_root)+1:len(strings.Join(elements, "/"))-3]

				// create directory if it doesn't exist
				os.MkdirAll(output_path, os.ModePerm)

				if mode == "render-pages" {

					command := "node ./ts/index.js render-page '" + path + "' '" + output_path + "'"

					resp, err := util.RunShellCommand(command)
					if err != nil {
						fmt.Printf("Error executing the command: %v\n", err)
						os.Exit(1)
					}

					fmt.Println(resp)
				}

			}
		}

		return nil
	})

	if err != nil {
		fmt.Printf("Error walking the path %s: %v\n", input_root, err)
	}

	if mode == "render-pages" {

		// modify index to make js non blocking:
		command := "node ./ts/index.js modify-index.html"
		resp, err := util.RunShellCommand(command)
		if err != nil {
			fmt.Printf("Error executing the command: %v\n", err)
			os.Exit(1)
		}

		fmt.Println(resp)

		// copy static files found under ../client/build to ../surface
		cp.Copy(file_root+"client/build", output_root)
		os.Exit(0)
	}

	// write SiteMap to ../surface/sitemap.json and ../client/src/sitemap.json

	writeSiteMap(siteMap, output_root+"/sitemap.ts")
	writeSiteMap(siteMap, "../client/src/sitemap.ts")

}
