/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
  
    if (error) return callback(error, null);
 
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
 
    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};

const fetchCoordsByIP = function(ipAddr, callback) {
  request('https://api.freegeoip.app/json/?apikey=ac8566d0-bc1b-11ec-8828-91653c45d69b&ipaddr=' + ipAddr, (error, response, body) => {
     
    if (error) return callback(error, null);
 
    if (response.statusCode !== 200) {
      callback(Error(`It didn't work.  Status Code ${response.statusCode} when fetching Coordinates for IP: ${ipAddr}`), null);
      return;
    }

    const coord = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    };
    callback(null, coord);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };