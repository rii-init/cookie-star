package main

import (
	"fmt"
	"generator/util"
	"os"
	"strings"

	cp "github.com/otiai10/copy"
)

func RenderPage(input_root string, output_root string, path string, elements []string) {
	// join elements with "/" and remove last 3 characters (.md)
	output_path := output_root + "/" + strings.Join(elements, "/")[len(input_root)+1:len(strings.Join(elements, "/"))-3]

	// create directory if it doesn't exist
	os.MkdirAll(output_path, os.ModePerm)

	command := "node ./ts/index.js render-page '" + path + "' '" + output_path + "'"
	resp, err := util.RunShellCommand(command)
	if err != nil {
		fmt.Printf("Error executing the command: %v\n", err)
		os.Exit(1)
	}

	fmt.Println(resp)
}

func prepareIndexHTML(input_root string, output_root string) {

	cp.Copy("../client/build", output_root)
	cp.Copy(input_root+"/manifest.json", output_root+"/manifest.json")
	cp.Copy(input_root+"/default.css", output_root+"/default.css")

	cp.Copy(output_root+"/index/index.html", output_root+"/index.html")
	rmErr := os.RemoveAll(output_root + "/index")
	if rmErr != nil {
		fmt.Println("(-_-) Huh.. Couldn't delete the extra index folder. ", rmErr)
	}

}
