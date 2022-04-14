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

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coord, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coord.latitude}&lon=${coord.longitude}`, (error, response, body) => {
 
    if (error) return callback(error, null);
 
    if (response.statusCode !== 200) {
      callback(Error(`It didn't work.  Status Code ${response.statusCode} when fetching pass times for : latitude=${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
      
    callback(null, passes);
  });
};
// iss.js

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ipAddr) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ipAddr, (error, coord) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coord, (error, passTimes) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, passTimes);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };