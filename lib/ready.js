const TFItems = require('./index.js');
const events = require('events');
TFItems.prototype = new events.EventEmitter;

let self = this;
this.getItemList(0, (err, data) => {
  if(err){
    self.emit("error", "Something went wrong while fetching items.\n"+err);
  } else {
    self.emit("ready", data);
  }
});
