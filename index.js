const TFItems = require('./lib/items.js');
const items = new TFItems({steam: "YourSteamAPIKey", backpacktf: "YourBackpackTFAPIKey"});
// Get your Steam API key from
// https://steamcommunity.com/dev/apikey
// and backpack.tf api key from
// https://backpack.tf/developer/apikey/view
// you will need "elevated access" to get names.

// We pass in parameter 0, so it would start with the first defindex in the list.
items.getItemList(0, (err, data) => {
  if(err){
    throw err;
  }
  // Fetch item names & extra qualities.
  items.getNames((err, data) => {
    if(err){
      throw err;
    }
    // Find item named "Pistol"
    items.findItem("Pistol", (err, resp) => {
      if(err){
        console.log(err);
      } else {
        console.log(resp);
        /*
          expected response:

          { name: 'Pistol',
          name_original: 'TF_WEAPON_PISTOL',
          proper_name: false,
          images:
           { normal: 'http://media.steampowered.com/apps/440/icons/c_pistol.711237b0fb5861ce3151058a11f430109205d3ba.png',
             large: 'http://media.steampowered.com/apps/440/icons/c_pistol_large.7d17878ac86e6ca15c5217f361cdf89f6afba301.png' },
          qualities: [ 'Unique', 'Strange' ],
          used_by: [ 'Scout', 'Engineer' ],
          defindex: 22,
          item:
           { class: 'tf_weapon_pistol',
             type_name: '#TF_Weapon_Pistol',
             name: '#TF_Weapon_Pistol',
             description: null,
             slot: 'secondary',
             image_inventory: 'backpack/weapons/c_models/c_pistol',
             model: 'models/weapons/c_models/c_pistol/c_pistol.mdl' },
          loadout_slots: null,
          capabilities:
           { nameable: true,
             can_gift_wrap: true,
             can_craft_mark: true,
             can_be_restored: true,
             strange_parts: true,
             can_card_upgrade: true,
             can_strangify: true,
             can_killstreakify: true,
             can_consume: true },
          attributes: null,
          levels: { min: 1, max: 1 } }
        */
      }
    });

    // You can also get item by defindex.
    console.log(items.items['199']);

    /*
      expected response:

      { name: 'Shotgun',
      name_original: 'Upgradeable TF_WEAPON_SHOTGUN_PRIMARY',
      proper_name: false,
      images:
       { normal: 'http://media.steampowered.com/apps/440/icons/w_shotgun.781e0a03e8536215731d276a911c5753e42901d4.png',
         large: 'http://media.steampowered.com/apps/440/icons/w_shotgun_large.9d8d23d241e3e1cc543154f2d7f43a850da25e02.png' },
      qualities: [ 'Unique', 'Strange' ],
      used_by: [ 'Soldier', 'Heavy', 'Pyro', 'Engineer' ],
      defindex: 199,
      item:
       { class: 'tf_weapon_shotgun',
         type_name: '#TF_Weapon_Shotgun',
         name: '#TF_Weapon_Shotgun',
         description: null,
         slot: 'primary',
         image_inventory: 'backpack/weapons/w_models/w_shotgun',
         model: 'models/weapons/c_models/c_shotgun/c_shotgun.mdl' },
      loadout_slots:
       { Soldier: 'secondary',
         Heavy: 'secondary',
         Pyro: 'secondary',
         Engineer: 'primary' },
      capabilities:
       { nameable: true,
         can_gift_wrap: true,
         can_craft_mark: true,
         can_be_restored: true,
         strange_parts: true,
         can_card_upgrade: true,
         can_strangify: true,
         can_killstreakify: true,
         can_consume: true },
      attributes: [ { name: 'special taunt', class: 'special_taunt', value: 1 } ],
      levels: { min: 1, max: 1 } }
    */
  });
});
