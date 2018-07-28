exports.dp_signup = function(req, res){
  //handle the signup, since the request has already gone through the .json() middleware the form data is accessible at
  //request body
  let form = req.body;
  if(!form){
    //no form data
    res.send("No form data.");
  }
  res.send("Form data received");
  console.log(form);
}

exports.get_form = function(req, res){
  //Get request, return the form
  res.sendFile('depositor.html', {root:__dirname+'../../../assets/public_html'});
}
