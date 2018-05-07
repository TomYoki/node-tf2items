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
}
