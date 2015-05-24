var Fantrax = require('./api');
var myFantrax = new Fantrax();

setInterval(function() {
  myFantrax.fetchData();
}, 1500);

//login
//get stats page
//parse
//post data to proper location
