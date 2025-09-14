# 🌠 ultr7a (legacy / deprecated) ✨🍪🐈
WebXR game engine, blogging framework and static site generator.

Create VR environments from markdown :)

### Getting Started
+ Your markdown files will be read from the `./content` folder.
+ To set a sort order, prefix each file with a number, like this `1.blog-page.md` `2.contact-page.md` etc
```
# Hello XR
<Sequence axis="x">
+ foo
    + bar
    + baz
[thing](https://example.link)
</Sequence>
```
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

#### Installing example content (optional)
```bash
cd generator;
./init-example.sh
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

#### Run-commands (custom scripts for each page)
+ Define your custom markdown js API at `./client/src/0100_content/configure.ts`
+ To specify run-commands for the game engine, for a specific markdown page, create a json file with matching name, like this `1.blog-page.json`
```json
{
    "call": [
        [
            "systems.byComponent.UserControls.track.setCameraPoses",
            [
                { "position": [ 0,    2, 4], "target": [0,  2,  -22] },
                { "position": [ 0.25, 1, 3], "target": [0,  2,  -22] },
                { "position": [-0.25,-2, 3], "target": [0,  2,  -22] },
                { "position": [ 0.25,-3, 3], "target": [0,  2,  -22] }
            ]
        ]
    ]
}
```
