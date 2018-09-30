const TFItems = require('./lib');
const keys = require('./keys.json');
const items = new TFItems(keys);
// Get your Steam API key from
// https://steamcommunity.com/dev/apikey
// and backpack.tf api key from
// https://backpack.tf/developer/apikey/view
// you will need "elevated access" to get names.

// We pass in parameter 0, so it would start with the first defindex in the list.

items.on('ready', (err, items) => {
  if(err){
    console.log(err);
  } else {
    console.log(items);
  }
});
