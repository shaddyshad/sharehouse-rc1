function render(res, file, config){
  //render the file to the res response structure, using options to tweak the behavious.
  //handle the root behaviour
  let root;
  if(!config['root']){
    //look for it in the environment
    if(!process.env.ROOT_DIR){
      //use the default
      root = __dirname;
    }else{
      //use this value
      root = process.env.ROOT_DIR;
    }
  }else{
    //root found in config, use that value
    root = config['root'];
  }
  let file = root + '/' + file;

  // next
  let error_message = config['error_message'] || "";


}
