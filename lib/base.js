const TuyaWebApi = require('./tuyawebapi');
const ato = require('arg-to-object');

class Base {
  constructor() {

    const defaults = {
      username: '',
      password: '',
      country: '31',
      platform: 'smart_life'
    };

    // Parse command line arguments
    this.options = ato.parse(process.argv, defaults);

    if (this.options.username === '' || this.options.password === '') {
      console.log('No username and/or password specified, please use --username and --password to specify credentials.');
      return;
    }

    // Create Tuya Web API
    this.api = new TuyaWebApi(
      this.options.username, 
      this.options.password, 
      this.options.country, 
      this.options.platform)
  }

  getToken(callback) {
    try {

      this.api.getOrRefreshToken().then((session) => {
        this.api.session = session;
        console.log('Login successful.');
        callback(this.api, this.options);
      }).catch((error) => {
        console.log('Error during login:', error);
      });

    }
    catch (error) {
      console.log('Error: ', error);
    }
  }
}

module.exports = Base;



