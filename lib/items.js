module.exports = TFItems;
const request = require('../node_modules/request');

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

TFItems.prototype.getItemList = function(start, callback){
  let self = this;
  let data = this.items;
  if(!this.allow.steam){
    throw new Error("Missing info from options.");
  }
  request("https://api.steampowered.com/IEconItems_440/GetSchemaItems/v0001/?format=json&key="+this.steam+"&start="+start, {json: true}, (err, response, body) => {
    if(err){
      callback(err)
    } else {
      if(body && body.result && body.result.items){
        let schema = body.result.items;
  			if(schema){
          schema.forEach((item, pos, array) => {
            let def = item.defindex;
            data[def] = {
              name: item.name,
              name_original: item.name,
              proper_name: item.proper_name,
              images: {
                normal: item.image_url,
                large: item.image_url_large
              },
              qualities: [self._getQuality(parseInt(item.item_quality))],
              used_by: item.used_by_classes || ["Not Specified"],
              defindex: def,
              item: {
                class: item.item_class,
                type_name: item.item_type_name,
                name: item.item_name,
                description: item.item_description || null,
                slot: item.item_slot,
                image_inventory: item.image_inventory,
                model: item.model_player
              },
              loadout_slots: item.per_class_loadout_slots || null,
              capabilities: item.capabilities,
              attributes: item.attributes || null,
              levels: {
                min: item.min_ilevel,
                max: item.max_ilevel
              }
            }
            if(pos+1 === Object.keys(array).length){
              if(body.result.next){
                return self.getItemList(body.result.next, callback);
              } else {
                self.items = data;
                return callback(null, data);
              }
            }
          });
  			} else {
          callback("Failed to retrieve items.");
        }
      } else {
        callback("Failed to retrieve body.");
      }
    }
  });
}

TFItems.prototype.getNames = function(callback){
  let data = {};
  let self = this;
  if(!this.allow.backpacktf){
    throw new Error("Missing info from options.");
  }
  request("https://backpack.tf/api/IGetPrices/v4?key="+this.backpacktf, {json: true}, (err, response, body) => {
    if(err){
      callback(err);
    } else {
      if(body.response && body.response.success && body.response.success === 1){
        const items = body.response.items;
        let pos = 0;
        for(let name in items) {
          let item = items[name];
          // Get through defindex(es)
          for(let def in items[name].defindex){
            let qualities = Object.keys(item.prices).map(quality => {
              return self._getQuality(parseInt(quality));
            })
            if(self.items && self.items[item.defindex[def].toString()]){
              let CName = self.items[item.defindex[def]].proper_name === true ? self.items[item.defindex[def]].name : name;
              self.items[item.defindex[def]].name = CName;
              self.items[item.defindex[def]].qualities = qualities;
            }
          }
          if(pos+1 === Object.keys(items).length){
            callback(null, self.items);
          }
          pos++;
        }
      } else {
        callback("Failed to retrieve names.");
      }
    }
  });
}

TFItems.prototype.findItem = function(text, callback){
    let self = this;
    let item;
    text = text.toLowerCase();
    for(let def in this.items){
      let val = self.items[def];
      if(val.name.toLowerCase().match(text)){
        item = val;
        break;
      }
    }

    if(item){
      return callback(null, item);
    } else {
      return callback("Such item doesn't exist.");
    }
}

TFItems.prototype._getQuality = function(quality){
    switch (quality) {
      case 0:
        return "Normal";
        break;
      case 1:
        return "Genuine";
        break;
      case 2:
        return "rarity2";
        break;
      case 3:
        return "Vintage";
        break;
      case 4:
        return "rarity3";
        break;
      case 5:
        return "Unusual";
        break;
      case 6:
        return "Unique";
        break;
      case 7:
        return "Community";
        break;
      case 8:
        return "Developer";
        break;
      case 9:
        return "Self-Made";
        break;
      case 10:
        return "Customized";
        break;
      case 11:
        return "Strange";
        break;
      case 12:
        return "Completed";
        break;
      case 13:
        return "Haunted";
        break;
      case 14:
        return "Collector's";
        break;
      case 15:
        return "Decorated Weapon";
        break;
      default:
        return "Unregistered Quality";
    }
}
