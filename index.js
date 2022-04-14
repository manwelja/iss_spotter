const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {

  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
//Print results
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dt = new Date(0);
    dt.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${dt} for ${pass.duration} seconds!`);
  }
};