const Base = require('./lib/base')

var base = new Base();

// Discover Tuya devices
console.log('Discovering Tuya devices...');
base.getToken((api, options) => {

  api.discoverDevices().then((devices) => {
    // Log devices to console
    console.log('Discovered devices:');
    console.log(devices);
  }).catch((error) => {
    console.log('Error discovering:', error);
  });

});