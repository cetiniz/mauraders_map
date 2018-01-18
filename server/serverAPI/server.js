var express = require('express');
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBiua_0qPExEsd4RF9b94R0G1s0nfCxOQ4'
});
var User;
var Relationship;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  return next();
});


// *******************
//       MAP
// *******************

app.post("/geocode", function(req, res) {
  googleMapsClient.geocode(req.body , function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  })
});

app.post('/geocode/reverse', function(req, res) {
  googleMapsClient.reverseGeocode(req.body , function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  })
});

app.post('/directions', function(req, res) {
  googleMapsClient.directions(req.body , function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  })
});

app.post('/places/search', function(req, res) {
  googleMapsClient.places(req.body , function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  })
});

app.post('/places/nearby', function(req, res) {
  googleMapsClient.placesNearby(req.body , function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  })
});

app.post('/places/details', function(req, res) {
  googleMapsClient.place(req.body , function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  })
});

app.post('/places/photos', function(req, res) {
  googleMapsClient.placesPhoto(req.body , function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  })
});

app.post('/places/predictions', function(req, res) {
  googleMapsClient.placesQueryAutoComplete(req.body , function (err, response) {
    if (err)
      res.send(err);
    res.json(response);
  })
});

// *******************
//       USERS
// *******************

app.get('/users', function (req, res) {
  var users = [];
  User.list({ include_docs: true }, function(err, body) {
    if (!err) {
      body.rows.forEach(function(row) {
        users.push(row.doc);
      });
      res.json(users);
    }
  });
});

app.post('/users', function (req, res) {
  var new_user = req.body;
  User.insert(new_user, function(err, body, header) {
    if (err)
      res.send(err);
    res.json(new_user);
  });
});

app.get('/users/:userId', function (req, res) {
  User.get(req.params.userId, { include_docs: true }, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
});

app.post('/users/:userId', function (req, res) {
  var update_user = req.body;
  User.insert(update_user, function(err, body, header) {
    if (err)
      res.send(err);
    res.json(update_user);
  });
});

// *******************
//    RELATIONSHIPS
// *******************

app.get('/relationships', function (req, res) {
  var relationships = [];
  Relationship.list({ include_docs: true }, function(err, body) {
    if (!err) {
      body.rows.forEach(function(row) {
        relationships.push(row.doc);
      });
      res.json(relationships);
    }
  });
});

app.post('/relationships', function (req, res) {
  var new_relationship = req.body;
  Relationship.insert(new_relationship, function(err, body, header) {
    if (err)
      res.send(err);
    res.json(new_relationship);
  });
});

app.get('/relationships/:relId', function (req, res) {
  Relationship.get(req.params.relId, { include_docs: true }, function (err, relationship) {
    if (err)
      res.send(err);
    res.json(relationship);
  });
});

app.post('/relationships/:relId', function (req, res) {
  var update_relationship = req.body;
  Relationship.insert(update_relationship, function(err, body, header) {
    if (err)
      res.send(err);
    res.json(update_relationship);
  });
});


// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
    // CF service named 'cloudantNoSQLDB'
    var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
    // user-provided service with 'cloudant' in its name
    var cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }

  // Create a new "Users" database.
  cloudant.db.create("users", function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: users");
  });
  User = cloudant.db.use("users");

  // Create a new "Relationships" database.
  cloudant.db.create("relationships", function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: relationships");
  });

  Relationship = cloudant.db.use("relationships");
}

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));


var port = process.env.PORT || 3000
app.listen(port, function() {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});


app.use(function (req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
