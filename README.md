# Sans-Typo
A simple typing test program that measures accuracy and words per minute.

### Running

#### With npm/nw
```sh
# downloads node-webkit (now nw.io)	
npm install

# runs Sans Typo using nw
npm start
```
This is the easiest method, but it is somewhat finicky (at least on Mint it was). Should this fail the application can be run directly with a downloaded version of [node-webkit](https://nwjs.io/) , which is what `npm start` calls. Syntax for using node-webkit is `nw path/to/project`.

#### With Chrome
Just double click on the `index.html` in the project folder. The use of node-webkit is to provide a stable, know target. The latest Chrome should perform equally as well. 

### Building

#### Source
```sh
# build tool
npm install -g parcello

# for dev, in the project root
parcello dev

# for production
parcello prod
```
#### Cross platform binaries
```sh
# will build the nw app for Windows, Mac, Linux
sh make-bins.sh
```

### On organization
Sans Typo, although written for an interview, is organized like a much larger project. It includes basic scaffolding for app, roles, features, pages and components. In this organizational scheme, an app has roles, roles incorporate features, features are collections of pages, and pages are made up of components. Folders containing code have common sense names. Source is in the "Source" folder, components are in the "Components" folder within source, etc.

#### File locations
If there are multiple files relating to a particular class or entity, that are specific to that entity, they are stored in a folder with the same name. e.g. `class Writer`, within Component/Writer.js, imports styles, which are contained in Component/Writer/Styles. These are then imported using standard ES6/7 imports. This helps keep code from becoming too cluttered.

#### One export per file
Although modern JS has the ability to export multiple results per file, this project maintains one default exported entity per file. The only exception is with certain style files, where they are sometimes grouped. These styles are still exported, but as a single array.

The code's "Main" method, it's entry point, is in the root of the Source's version folder, and is called "entry.js". Entry instantiates the app and loads the navigation.

### Curiosities

#### Absolute dependency paths
While working with very large projects where naming patterns lead to same-named files within deep directory structures, it's not uncommon to find something like this `../../../../some/folder/handler.js` .The deeper this goes, the less clear it becomes. Absolute names make a path clear. Modern build processes can re-write them into relative, or CDN'd names if needed. In this instance, a path acts like a namespace.

#### Parcello/exports
At the bottom of almost all (if not all), code there's an export line that is not the ES6/7 export. 
`exports(something).as('path/to/something')`
This is Parcello's export mechanism, which allows lazy importing. It allows projects to be loaded apart instead of bundled, and also allows run time resolution of dependencies (vs bundle time resolution).

#### Multiple constructors
You'll often see construct_structure/style/relationships in this code. Segregated constructors keep code clean. When issues occur, it's easy to weed out where to start looking.

#### this.state(property, value)
this.state allows for eventful properties. Any property with this automatically triggers any events bound to it. e.g. this.state('wordCount', 45) changes wordCount to 45, and triggers any events bound using the this.on('wordCountChanged') listener.

#### CSS in the JS
The JSUI framework, upon which Sans Typo is built, allows dynamic generation of style sheets. It tracks styles used by on-screen components, allows for element queries (not seen in this project), and provides templating/themeing tools. Most of what it can do is not in here due to the possible confusion it might cause. At it's core, the most useful thing about this arrangement is in having the component reference the styles it uses, and keeping them near in the file tree. This helps reduce side effects and makes the styles responsible for rendering that component easy to find.

#### Identity class
Keeps current and inherited styles working. It also allows a class version to be checked at runtime (let's hope this never happens), in case some seriously ugly code goes down. If exported on it's own, it can also be used to automatically make sure styles use the correct selector.

#### framing vs theme styles
Framing styles are things that affect place, size, and shape. Padding, margins, and visibility are included. Theme is anything related to borders, backgrounds, colors, and overall aesthetic. 

#### JSUI framework
There should be a copy in the Dependency folder. I'm proud of my framework, but it's also not a finished product. It's currently unpublished because of this fact. Please keep that in mind if you peek under the hood.