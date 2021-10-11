// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let responseObj={};

//timestamp
app.get('/api/:date_string', function(req,res){
  let date = req.params.date_string;
  let integerReg= /^\d+$/;
  if (date.includes('-')){
    responseObj['unix']= new Date(date).getTime();
    responseObj['utc']= new Date(date).toUTCString();
  } else if (integerReg.test(date)) {
    date= parseInt(date);
    responseObj['unix']= new Date(date).getTime();
    responseObj['utc']= new Date(date).toUTCString();
  } else {
    responseObj['unix']= new Date(date).getTime();
    responseObj['utc']= new Date(date).toUTCString();
  }
  if(!responseObj.unix || !responseObj.utc){
    res.json({error: 'Invalid Date'});
  }

  res.json(responseObj);
});

app.get('/api', function(req,res){
  res.json({'unix': new Date().getTime(),
'utc': new Date().toUTCString()});
});

// app.get('/api/:day/:month/:year',function(req,res){
//   let date=req.params.year+'-'+req.params.month+'-'+req.params.day;
//   responseObj['unix']= new Date(date).getTime();
//   responseObj['utc']= new Date(date).toUTCString();
//   res.json(responseObj);
// });
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
