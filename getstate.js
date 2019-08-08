const Base = require('./lib/base')

var base = new Base();

// Discover Tuya devices
console.log('Get Tuya device state...');
base.getToken((api, options) => {

  if (options.id === '') {
    console.log('No device id specified, please use --id to specify the device id.')
  }
  else {

    console.log('Device id: ' + options.id);
    api.getDeviceState(options.id).then((device) => {
      // Log device state
      console.log('Device state:');
      console.log(device);
    }).catch((error) => {
      console.log('Error getting state:', error);
    });
  }

});