const TFItems = require('./index.js');

TFItems.prototype.getInventory = function(user, callback){
  let self = this;
  if(Object.keys(this.items) === 0){
    return callback("Initialize items before requesting inventory.");
  }
  const qs = {
    steamid: user
  }
  this.webAPI('IEconItems_440/GetPlayerItems', 'v0001', qs, (err, body) => {
    if(err){
      callback(err);
    } else {
      if(body.result && body.result.items){
        const items = body.result.items;
        if(items.length === 0){
          return callback("No items found.");
        }
        let resp = [];
        for (var i = 0; i < items.length; i++) {
          let item = items[i];
          resp.push({
            name: self._australiumName(self._getHashName(item.quality, !item.hasOwnProperty("flag_cannot_craft"), self.items[item.defindex].name || "Unknown Item"), item.style || 0, item.defindex),
            images: self.items[item.defindex].images,
            defindex: item.defindex,
            level: item.level,
            quality: item.quality,
            assetid: item.inventory,
            quantity: item.quantity,
            origin: item.origin,
            craftable: !item.hasOwnProperty("flag_cannot_craft"),
            attributes: item.attributes || null
          });
          if(i+1 >= items.length){
            return callback(resp);
          }
        }
      } else {
        callback("Failed to load items.");
      }
    }
  })
}

TFItems.prototype._australiumName = function(name, style, def){
  if(def === 5037) // Ignore "Australium Gold" paint.
    return name;
  if(style !== 1 && name.match("Australium"))
    name = name.replace(/Australium /i, "");
  return name;
}

TFItems.prototype._getHashName = function(quality, craftability, name){
    quality = this._getQuality(quality);
    let func = {
      get craftable(){
        return craftability === false ? "Non-Craftable "+name : name;
      },
      get hasPrefix(){
        return name.indexOf('The') === 0;
      },
      get prefixSwitch(){
        if(this.hasPrefix)
          name.slice(0, 4);
        return name;
      }
    }
    let prefix = func.hasPrefix;

    if(quality === "Unique"){
      if(!craftability){
        name = func.prefixSwitch;
        return func.craftable;
      }
      return name;
    } else {
      name = quality+" "+func.prefixSwitch
      return func.craftable;
    }
}
