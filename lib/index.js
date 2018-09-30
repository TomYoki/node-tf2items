'use strict'
module.exports = TFItems;

require('./items.js');
require('./request.js');
require('./inventory.js');

function TFItems(options){
  if(typeof options !== "object" || !options.hasOwnProperty("steam"))
    throw new Error("Missing info from options.");

  this.allow = {
    steam: options.hasOwnProperty("steam"),
    backpacktf: options.hasOwnProperty("backpacktf")
  }
  this.steam = options.steam;
  this.backpacktf = options.backpacktf;
  this.items = {};
  this.init();
}

TFItems.prototype.init = function(){
  let self = this;
  this.getItemList(0, (err, data) => {
    if(err){
      self.emit("ready", "Something went wrong while fetching items.\n"+err);
    } else {
      self.emit("ready", (null, data));
    }
  });
}
