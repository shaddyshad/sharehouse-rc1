
let client_dir = __dirname+'../../assets/public_html';
const records_per_page = 10;

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
  if(n > 0){
    //atleast n records
    n = records_per_page;   //10 is the default records to show
  }
  //query parameters stored in res.body
  //construct a wh_request object using res.body
  //the whr_ prefix is used in the browser forms to specify warehouse request parameter
  let wh_req = wh_request(req.body.whr_size, req.body.whr_type, req.body.whr_sd, req.body.whr_mop, req.body.whr_spec);

  //
  if(!wh_req.sanitize()){
    //invalid form, redirect to the previous page with an error message and the values pre filled
    let error_message = "Please check your entries. There was a problem processing the form.";
    return render(res, 'warehouse_request', {root:client_dir, error_message: error_message});
  }
}
