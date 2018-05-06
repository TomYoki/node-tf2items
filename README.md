# node-tf2items


## What is this for?
This tool lets you easily find all TF2 items, with their images, proper names & more.


## Install
1. Make sure you have NodeJS & NPM installed.
2. Clone this repository.
3. Locate the folder and type `npm i`.
4. Type `node .` to see it in action.


## Usage
1. Require `/lib/items.js` file.
2. Create new instance of it and pass in object with Steam & backpack.tf API Key.
3. Fetch items using `items.getItemList(start, callback(err, data));`.
4. Fetch proper names using `items.getNames(callback(err, data));`.
5. Find items either by their defindex `items.items[defindex]` or by using `items.findItem(name, callback(err, data));` method.


## Example
See index.js for example.
