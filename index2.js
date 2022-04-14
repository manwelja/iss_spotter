const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

//Print results
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dt = new Date(0);
    dt.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${dt} for ${pass.duration} seconds!`);
  }
};