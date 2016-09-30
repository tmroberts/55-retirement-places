var express = require('express');
var app = express();

app.use(express.static('public'));

console.log('process.env', process.env);

var apiKey = process.env.SIMPLYRETS_KEY;

// app.listen(5000, function() {
//   console.log('listening on port 5000.');
// });

// npm run-script node server/server.js
//
// sh launch.sh


var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('listening on port', port);
});
