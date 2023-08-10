package main

import (
	"compiler/util"
	"fmt"
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

func RenderIndexHTML(file_root string, output_root string) {
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
	cp.Copy(file_root+"content/manifest.json", output_root)
}
