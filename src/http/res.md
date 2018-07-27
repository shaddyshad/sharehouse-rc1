## res.js
Common code for response services.

The common functionality shared by several responses, will be found in this file. Something like `render()` which renders a webpage, with some options.

## apis
`render(res, file, config)` - Renders the file `file`, which are mostly `.html` files to the response object res, using config to tweak it's behaviour.
A few things to twea include where to search for the file, or some rendering options like an error message to pass to the client, setting the appropriate headers along.
