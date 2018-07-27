## Storage space request functionality
This file `request.js` provide api and logic implementation for storage space request feature.

*Generally, throughout the codebase, a storage space, no matter the size,  has been refered to as warehouse.*

#### apis
`get_request(req, res) -> Terminates request-response cycle` - This API is generally called to generate a client request
for storage. Usually triggered by client clicking on `find space` or other related urls.
The api assumes that the client has been authenticated, so it is up to the middleware dispatcher to ensure that all
requests to this api, and generally, to all apis in this service are authenticated.

The api responds by sending the file, later, we could, instead of sending a full html file, just pop up a modal.

`put_request(req, res) -> Forwards the request to done_putting_request()` - This API end point actually initiates a space request, it assumes that the request data will be encoded in `req`.
*Dependencies*   

This API depends on `sanitize_form_data(form_data)` to ensure that the form data is not malicious. After which it will add a record in the requests db, and generate a queryset for all available warehouses ordered by the `filter_param` which is a variable storing serialized form data. The API call `filter_queryset(qs, fp, n)` passing the queryset and the filter parameter and optionally `n`, which returns atleat n entries, assuming n is not greater than total entries, in which case, the behaviour is as if the whole queryset has been requested.

The API returns a queryset and does not terminate the request-response cycle, it is up to the caller to decide what to do with the return. It might also return empty set if there are no records in the db.

In future, it will allow strict specification of queryset.
