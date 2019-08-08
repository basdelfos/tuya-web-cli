const Base = require('./lib/base')

var base = new Base();

// Get Tuya device state
console.log('Get Tuya device state...');
base.getToken((api, options) => {

  if (!options.id || options.id === '') {
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