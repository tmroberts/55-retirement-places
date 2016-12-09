var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var apiKey = process.env.SIMPLYRETS_KEY;
//console.log('This is var apiKey:  ', process.env.SIMPLYRETS_KEY); atm, this is undefined...


app.use(express.static('public'));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));

//console.log('process.env', process.env);


app.post('/sendemail', function (req, res) {
  res.send('Got a POST request');
  console.log('POST received', req.body);  //This prints the JSON document received (if it is a JSON document)
  //console.log(request.body.formFieldName);
  var name=req.body.name;
  var email=req.body.email;
  var phone=req.body.phone;
  var info=req.body.info;

  //console.log("Name = "+name+", email is "+email+", Phone = "+phone+", Info = "+info);
  //console.log("Name = ", name);
  //console.log("Email is "+email+"");
  //console.log("Phone = "+phone+"");
  //console.log("Info = "+info+"");
  var html = 'Name: ' + name + '\r\n \r\n' +
  'Email: ' + email + '\r\n \r\n' +
  'Phone Number: ' + phone + '\r\n \r\n' +
  'Additional Informtion: ' + info + '\r\n \r\n' ;
  //res.send(html);

  // using SendGrid's v3 Node.js Library
  //https://github.com/sendgrid/sendgrid-nodejs

  var helper = require('sendgrid').mail

  from_email = new helper.Email("55retirementplaces@example.com");
  //to_email = new helper.Email("tmroberts7@gmail.com");
  to_email = new helper.Email("trkr6@verizon.net")
  subject = "Testing email with SendGrid";

  //content = new helper.Content("text/plain", info);
  //content = new helper.Content("text/plain", "I'm interested in Robson Ranch, please give me a call at the above number")
  //content = new helper.Content("text/plain", name);
  //content = new helper.Content("text/plain", email);
  //content = new helper.Content("text/plain", phone);
  //content = new helper.Content("text/plain", info);

  content = new helper.Content("text/plain", html);

  //console.log("Info = "+info+"");

  mail = new helper.Mail(from_email, subject, to_email, content)


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
//
// sh launch.sh

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('listening on port', port);
});
