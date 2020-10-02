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

// main code
app.get("/api/timestamp", (req, res) => {
  // res.json({t: "now"})
  const dt = new Date(Date.now());
  res.json({ "unix": dt.getTime(), "utc": dt.toUTCString() });
})

app.get("/api/timestamp/:timeString", (req, res) => {
  // res.json({t: req.params.timeString})
  const dt = new Date(req.params.timeString);
  if (dt.toUTCString() == "Invalid Date") {
    const dt1 = new Date(parseInt(req.params.timeString));
    if (dt1.toUTCString() == "Invalid Date") {
      res.json({"error" : "Invalid Date" });
    } else {
      res.json({ "unix": dt1.getTime(), "utc": dt1.toUTCString() });
    }
  } else {
    res.json({ "unix": dt.getTime(), "utc": dt.toUTCString() });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
