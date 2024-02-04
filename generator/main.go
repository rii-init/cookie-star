package main

import (
	"encoding/json"
	"fmt"
	model "generator/model"
	"io"
	"os"
	"path/filepath"
	"strings"
)

func initConfig(config *model.Config) {
	// Open our jsonFile
	jsonFile, err := os.Open("config.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println("If you'd like to change how pages and environments are rendered and organised, you can create a config.json file in the compiler directory.")
		fmt.Println(err)
	}

	if jsonFile != nil {
		defer jsonFile.Close()

		fmt.Println("!? 0w0 What's dis? [Detected config.json]")

		// read our opened jsonFile as a byte array into our config variable
		byteValue, _ := io.ReadAll(jsonFile)
		json.Unmarshal(byteValue, &config)
	} else {

		// It's okay. The defaults are pretty sensible.
		config = &model.Config{
			CapitaliseSmolTitles:                 true,
			CapitaliseSmolTitlesUnderNCharacters: 3,
		}

	}
}

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

	jsonString = []byte(strings.Replace(string(jsonString), "],", "] as {title: string, path: string}[],", -1))

	// write to file
	fo.Write(jsonString)
}

func getTitle(config *model.Config, file_without_extension string) string {

	var titleElements []string = make([]string, 0)

	// check if filename contains underscore:
	if strings.Contains(file_without_extension, "_") {
		titleElements = strings.Split(file_without_extension, "_")
	} else if strings.Contains(file_without_extension, "-") {
		titleElements = strings.Split(file_without_extension, "-")
	} else {
		titleElements = []string{file_without_extension}
	}

	if &config.CapitaliseSmolTitles != nil && config.CapitaliseSmolTitles {
		// You might wanna capitalise short abbreviations, automatically. This can be changed in compiler/config.json. I'm not going to tell you how to name things. You do you, unelss it comes down to sorting orders, and in that case, you'll need to prefix the sort order and a dot to the filename, like this: 0.index.md
		if len(titleElements) == 1 && len(titleElements[0]) < config.CapitaliseSmolTitlesUnderNCharacters {
			return strings.ToUpper(titleElements[0])
		}
	} else {
		if len(titleElements) == 1 && len(titleElements[0]) < 3 { // Awww.. It's so kawaii ♡〜٩( ╹▿╹ )۶〜♡
			return strings.ToUpper(titleElements[0])
		}
	}

	// capitalise first letter of each word
	for i := 0; i < len(titleElements); i++ {
		titleElements[i] = strings.ToUpper(titleElements[i][0:1]) + titleElements[i][1:]
	}

	return strings.Join(titleElements, " ")
}

func main() {

	// print GENERATOR_MODE environment variable:
	fmt.Println("GENERATOR_MODE: " + os.Getenv("GENERATOR_MODE"))

	// Let's read the config.file, right away.
	// The user might be a particular individual (Not a bad thing!)

	var (
		config model.Config
	)

	initConfig(&config) // Let's gooOwO!!!

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
		fmt.Println("generator/ts/index.js missing; run `npm install` in generator directory")
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

				fmt.Printf("File: %s", path)
				elements := strings.Split(path, "/")

				// check if the last element contains 3 dots,
				// for example: 0.index.md  (first component is the sort order)

				filename_components := strings.Split(elements[len(elements)-1], ".")

				if len(filename_components) > 2 {
					filename_without_sort_order := strings.Join(filename_components[1:], ".")
					elements[len(elements)-1] = filename_without_sort_order
				}

				if mode == "create-sitemap" {
					CreateSitemap(&config, elements, &siteMap)
				}

				if mode == "render-pages" {
					RenderPage(input_root, output_root, path, elements)
				}

			}
		}

		return nil
	})

	if err != nil {
		fmt.Printf("Error walking the path %s: %v\n", input_root, err)
	}

	if mode == "render-pages" {
		prepareIndexHTML(file_root, output_root)
		os.Exit(0)
	}

	// write SiteMap to ../surface/sitemap.json and ../client/src/sitemap.json

	writeSiteMap(siteMap, output_root+"/sitemap.ts")
	writeSiteMap(siteMap, "../client/src/sitemap.ts")

}
