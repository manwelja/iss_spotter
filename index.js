const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log(error);
    return;
  }
  // fetchCoordsByIP(ip, (error, data) => {
  //   if (error) {
  //     console.log(error);
  //     return;
  //   }
  //   console.log(data);

  // });
});

