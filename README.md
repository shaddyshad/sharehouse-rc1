# Sharehouse clean project tree
Sharehouse project backend code.

# Directory structure - relative to root 
/client - All client related files and templates
    /assets - Asset file including images, css and js file 
        /public_html - All html files will mostly belong to this directory.
        /css - Stylesheets to most files in public_html
        /images - Images and other graphical assets
/server - All server side scripts and modules 
  /src - Javascript source files
    /warehouse - scripts relating to warehouse service manipulation, like adding warehouses, requesting all, e.t.c 
    /db - Scripts that do database connection and querying
    /http - Scripts to handle simple manipulation of http request and responses, like adding headers, extracting form data e.t.c 
      /req.js - Module defining request related operations
/app.js - Server glue and application main file. It is the `start state` for the state machine proponents or the `main application` in a normal jargon.

## Routes and state transitions
All website states are routed at the route `/`, any request to this resource or any operation that may transit you to the root resource.
`app.get('/')` - in `app.js`  

## Doc syntax references 
In most internal docs, you will most likely encounter syntaxes like `http:req:foo()`, the interpretation of this syntax shouldn't be hard, it means, `http` folder, relative to `src/` directory, then inside the http folder, `req` file and they're mostly, `req.js` file. Then inside this js file, `foo()` function.

### Futher documentation
There is a `filename.md` file associated with every entry, they mostly document the dependencies, functionalities and apis. They are a better resources to describe the core business logic.

