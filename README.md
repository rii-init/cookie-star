# ultr7a.com (blog+game)
WebXR game engine, blogging framework and static site generator.

Create VR environments from markdown :)

### Getting Started
+ Your markdown files will be read from the `./content` folder.
+ To set a sort order, prefix each file with a number, like this `1.blog-page.md` `2.contact-page.md` etc
+ To specify run-commands for the game engine, for a specific markdown page, create a file with matching name, like this `1.blog-page.json`
+ Once your content is in place, the generator, the server and the client need to be compiled.. 

#### Setting up the 3 components:
```bash
### Setup
cd ./client
npm install

cd ../server
go build

../generator
./build.sh
```
#### Generating a webxr site from markdown:
```bash
### Usage
cd ./client

# render markdown, compile front-end, and create static files to serve:
npm run generate

# dev mode
npm start
```
