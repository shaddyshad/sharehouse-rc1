
let client_dir = __dirname+'../../assets/public_html';

function get_request(req, res){
  //this is a get request, return the form data
  res.sendFile('warehouse_request.html', root:client_dir);
}

/*
* @req - request object
* @res - response object
*[n] - upto n results in the queryset
* returns a queryset and does not terminate the request-response cycle
*/
function post_request(req, res, n){
  let whole_qset = true;
  if(n > 0){
    //atleast n records
    whole_qset = false;
  }
  //query parameters stored in res.body
  //construct a wh_request object using res.body 
}
