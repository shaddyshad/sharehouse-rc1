## res.js
Common code for response services.

The common functionality shared by several responses, will be found in this file. Something like `render()` which renders a webpage, with some options.

## apis
`render(res, file, config)` - Renders the file `file`, which are mostly `.html` files to the response object res, using config to tweak it's behaviour.
A few things to twea include where to search for the file, or some rendering options like an error message to pass to the client, setting the appropriate headers along.    


The `config` option can contain the following fiels, each of which have a default value
- `root` - specifies where to mount the search of the file, if it is not defined, the code will try to look for it in the environment variables exposed using .dotenv and if still not found, defaults to `__dirname`.
- `error_message` - specifies a string that will be interpolated into the file, at the expansion node specified with `error_message`. Support for jade only.
