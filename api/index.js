var Fantrax = function() {
  var self = this;
  self.credentials = require('./.credentials');
  self.domain = 'https://www.fantrax.com/login.go?loginMsgId=b';
  self.apis = [];
};

Fantrax.prototype.request = function(api, method, params, data, callback) {
  var self = this;
  var url = '';
  url += self.domain;
  url += '/api/' + api;

  var headers = {
    'Cookie': self.credentials.cookie,
    'User-Agent': 'User Agent/0.0.1'
  };

  var options = {
    url: url,
    method: method,
    headers: headers,
    qs: params
  };

curl "http://www.fantrax.com/" 
-H "Accept-Encoding: gzip, deflate, sdch" 
-H "Accept-Language: en-US,en;q=0.8" 
-H "User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.65 Safari/537.36" 
-H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" 
-H "Cache-Control: max-age=0" 
-H "Cookie: uig=acgtszvii7e3wdjc; 
uac=ycza5clii7e3wdjd; 
ui=pa5y4yk7i74tcfyh; 
BAYEUX_BROWSER=9cf0-15gjjos4eant8i7kppbjpv00; 
__utmt=1; 
__utma=221131663.1812537929.1426645516.1432428782.1432432096.161; 
__utmb=221131663.19.10.1432432096; 
__utmc=221131663; 
__utmz=221131663.1426645516.1.1.
utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); 
JSESSIONID=1ap4v6rc8c9g4o0qxvtzocgz4; 
FANTRAX_REMEMBERS=""ZGJiODE3OjE3NDc3OTQ0NTk1NDk6MzExMjZiZTQxNjRiNGM1NjM4M2ZiY2U5MWQ3YTc1NzM=""" 

-H "Connection: keep-alive" --compressed


  if(data) {
    options.body = JSON.stringify(data);
    options.headers['Content-Type'] = 'application/json';
    options.headers['Origin'] = 'http://echo.amazon.com';
    options.headers['Referer'] = 'http://echo.amazon.com/spa/index.html';
    options.headers['csrf'] = self.credentials.csrf;
  }

  var req = require('request');
  req(options, function(err, res, body) {
    if(!err && res.statusCode == 200) {
      callback.call(self, body);
    } else {
      console.log('err!');
      console.log(err, res.statusCode, body);
    }
  });
};

Fantrax.prototype.get = function(api, params, callback) {
  var self = this;
  self.request(api, 'GET', params, null, callback);
};

Fantrax.prototype.put = function(api, params, data, callback) {
  var self = this;
  self.request(api, 'PUT', params, data, callback);
};

Fantrax.prototype.fetchData = function() {
  var self = this;
  self.busy = true;
  self.get('todos', {
    type: 'TASK',
    size: self.tasksToFetch
  }, function(body) {
    var json = JSON.parse(body);
    var tasks = json.values;

    var oldStr = JSON.stringify(self.tasks);
    var newStr = JSON.stringify(tasks);

    if(oldStr != newStr) {
      self.tasks = tasks;
      self.parseTasks();
    }
  });
};

Fantrax.prototype.parseData = function() {
  var self = this;
  console.log('%d tasks found.', self.tasks.length);

  // TODO: fix this super inefficient code.
  var tasks = self.tasks;
  for(var i in self.apis) {
    var api = self.apis[i];
    for(var j in tasks) {
      var task = tasks[j];
      tasks[j] = api.parse(task);
    }
  }

};


module.exports = Fantrax;
