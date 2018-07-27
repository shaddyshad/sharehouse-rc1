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
/app.js - Server glue and application main file. It is the `start state` for the state machine proponents or the `main application` in a normal jargon.

## Routes and state transitions
All website states are routed at the route `/`, any request to this resource or any operation that may transit you to the root resource.
`app.get('/')` - in `app.js`  
