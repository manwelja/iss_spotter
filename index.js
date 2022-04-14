const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log(error);
    return;
  }
  // fetchCoordsByIP(ip, (error, coord) => {
  //   if (error) {
  //     console.log(error);
  //     return;
  //   }

  //   fetchISSFlyOverTimes(coord, (error, data) => {
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }

  //   });
  //  });
});

