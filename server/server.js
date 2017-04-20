var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require("request");
var btoa= require("btoa");


app.use(express.static('public'));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));


app.get('/active_listings', function(req, res){
  //console.log('we have hit active listings');
  //console.log('This is req.params: ', req.params);
  console.log('This is req.query.q: ', req.query.q);
  console.log('This is req.query.postalCode: ', req.query.postalCode);
  var q = req.query.q;
  var postalCode = req.query.postalCode;

  var options = {
    //the AJAX call uses the /properties endpoint
    url: 'https://api.simplyrets.com/properties?limit=50&type=residential&status=active&q='+ q + '&postalCode=',

    headers: {
      'User-Agent': 'request',
      'Authorization':  "Basic " + btoa(process.env.SIMPLYRETS_USERNAME + ":" + process.env.SIMPLYRETS_API_KEY)
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.send(info);
    }
    //console.log('raw data returned from api is:  ', body );
    //console.log('parsed data is:  ', info );
    console.log('status code:  ', response.statusCode );

    //////////////. . . WE GET HERE . . . ///////////////////////////
  }

  request(options, callback);

  //res.end('Done');
});


app.post('/sendemail', function (req, res) {
  res.send('Got a POST request');
  console.log('POST received', req.body);  //This prints the JSON document received (if it is a JSON document)
  //console.log(request.body.formFieldName);
  var name=req.body.name;
  var email=req.body.email;
  var phone=req.body.phone;
  var info=req.body.info;
  //console.log("Name = ", name);
  //console.log("Email is "+email+"");
  var html = 'Name: ' + name + '\r\n \r\n' +
  'Email: ' + email + '\r\n \r\n' +
  'Phone Number: ' + phone + '\r\n \r\n' +
  'Additional Information: ' + info + '\r\n \r\n' ;
  //res.send(html);

  // using SendGrid's v3 Node.js Library
  //https://github.com/sendgrid/sendgrid-nodejs

  var helper = require('sendgrid').mail;

  from_email = new helper.Email("55retirementplaces@example.com");
  //to_email = new helper.Email("tmroberts7@gmail.com");
  to_email = new helper.Email("trkr6@verizon.net")
  subject = "55 Retirementplaces Client Contact";
  content = new helper.Content("text/plain", html);
  mail = new helper.Mail(from_email, subject, to_email, content);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  })
})

// app.listen(5000, function() {
//   console.log('listening on port 5000.');
// });

// npm run-script node server/server.js
// sh launch.sh

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('listening on port', port);
});
