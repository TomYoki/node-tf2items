const TFItems = require('./index.js');
const request = require('request');

TFItems.prototype.webAPI = function(path, ver, qs, callback){
  let options = {
    uri: `https://api.steampowered.com/${path}/${ver}/`,
    method: "GET",
    json: true,
    gzip: true,
    qs: {
      key: this.steam,
      format: 'json'
    }
  }
  options.qs = Object.assign(qs, options.qs);
  request(options, (err, resp, body) => {
    if(err || resp.statusCode !== 200){
      callback("There was an issue when requesting the API.");
    } else {
      callback(null, body);
    }
  });
}

TFItems.prototype.webReq = function(uri, method, json, qs, callback){
  let options = {
    uri: uri,
    method: method,
    json: json,
    gzip: true,
    qs: qs
  }
  request(options, (err, resp, body) => {
    if(err || resp.statusCode !== 200){
      err = err ? err : `Status code of ${resp.statusCode}.`;
      callback("There was an error when making the request.\n"+err);
    } else {
      callback(null, body);
    }
  })
}
