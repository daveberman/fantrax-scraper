var Echo = require('./api/echo');
var NestApi = require('./api/nest');
var HueApi = require('./api/hue');
var myEcho = new Echo();
myEcho.apis.push(new NestApi());
myEcho.apis.push(new HueApi());

setInterval(function() {
  myEcho.fetchTasks();
}, 1500);

//login
//get stats page
//parse
//post data to proper location
