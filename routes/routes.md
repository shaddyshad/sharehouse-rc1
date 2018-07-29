## Main API structure documentation
This file describes the structure of the provided API, their usage, caveats and other information.
Mostly, the files in here just provide different API end point to clients and they can access it from any RESTful compliant client.
*notes*   
Something important to know is the protocol used by the services provided here.   
- `JSON` is used to exchange messages between the client and the server
- `error`. Error messages are communicated to the client in form of response status, with a message to indicate what is happening.
- `success` - Some success messages may include data, which is directly sent over JSON to the client, but some operations, like `insert`, where really, at a minimum level, the client is only interested in finding out if everything went well, or a problem was encountered, are also comminicated via `JSON statuses`.   
This is a standard I adapted just for the MVP, maybe after a few iterations, we'll get better.

### Files    
`users.js` - Contains definitions of services regarding the manipulation of users to client. Mainly, it is heavily depended on by services like login, signup among other that rely on user data existence.   
For most listing services, they can be accessed via a `GET` request to the endpoint, but still requires to be a validated request. The system uses a very simple state machine to determine if a request is authenticated and authorized to access the data, and if not, returns an error message.