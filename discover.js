const TuyaWebApi = require('./lib/tuyawebapi');
const ato = require('arg-to-object');

const defaults = {
  username: '',
  password: '',
  country: '31',
  platform: 'smart_life'
};

// Parse command line arguments
let options = ato.parse(process.argv, defaults);

if (options.username === '' || options.password === '') {
  console.log('No username and/or password specified, please use --username and --password to specify credentials.');
  return;
}

// Create Tuya Web API
var api = new TuyaWebApi(options.username, options.password, options.country, options.platform)

try {
  // Discover Tuya devices
  console.log('Discovering Tuya devices...');
  api.getOrRefreshToken().then((session) => {
    api.session = session;
    console.log('Login successful');
    api.discoverDevices().then((devices) => {
      // Log devices to console
      console.log('Discovered devices:');
      console.log(devices);
    }).catch((error) => {
      console.log('Error discovering:', error);
    });
  }).catch((error) => {
    console.log('Error during login:', error);
  });
}
catch (error) {
  console.log('Error: ', error);
}
