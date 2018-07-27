//class declarations
let tuff_feature = class {  //represents a tuuf_feature entry used in geo-spartial calculations
  constructor(long, lat, name){
    this.type = "Feature",
    this.geometry = {
      type: "Point",
      coordinates: [long, lat]
    },
    this.properties ={
      name: name
    }
  }
}


//wh_request - to represent a warehouse request
let wh_request = class{
  constructor(sz, type, loc, sd, mop, add){
    this.size = sz;
    this.type = type;
    this.loc = loc;
    this.starting_date = sd;
    this.mop = mop;
    this.add_spec = add;
  }
}
