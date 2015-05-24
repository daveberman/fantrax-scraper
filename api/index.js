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
