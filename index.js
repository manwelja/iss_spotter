const { fetchMyIP } = require("./iss");

fetchMyIP((error, ip) => {
  console.log('huh');
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked!  Return IP:', ip);
    
});