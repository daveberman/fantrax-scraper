var request = require ('request') //find this somewhere - download? https://github.com/request/request
request.post('https://www.fantrax.com/login.go?loginMsgId=b').form({j_username: 'dbb817@gmail.com', j_password: 'inserthere'}) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the fantrax league homepage.
  }
})

var Fantrax = require('./api');
var myFantrax = new Fantrax();

setInterval(function() {
  myFantrax.fetchData();
}, 1500);

//login
//get stats page
//parse
//post data to proper location
