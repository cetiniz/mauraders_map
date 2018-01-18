/*
'use strict';

var //mongoose = require('mongoose'),
    User, // = mongoose.model('Users'),
    Relationship, // = mongoose.model('Relationships'),
    cfenv = require("cfenv"),
    googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyBiua_0qPExEsd4RF9b94R0G1s0nfCxOQ4'
    });


// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {};

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
  cloudant.db.create("Users", function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: Users");
  });
  User = cloudant.db.use("Users");

  // Create a new "Relationships" database.
  cloudant.db.create("Relationships", function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: Relationships");
  });

  Relationship = cloudant.db.use("Relationships");
}


// *******************
//       MAP
// *******************

exports.geocode =

exports.reverse_geocode = function(req, res) {

};

exports.directions =

exports.places_search =

exports.places_nearby =

exports.places_details =

exports.places_photos =

exports.places_prediction =


// *******************
//       USERS
// *******************

exports.list_all_users =

exports.create_user =

exports.read_user =

exports.update_user =

exports.delete_user = function (req, res) {
  User.remove({
    _id: req.params.userId
  }, function (err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

// *******************
//    RELATIONSHIP
// *******************

exports.list_all_relationships =

exports.create_relationship = ;

exports.read_relationship = ;

exports.update_relationship = ;

exports.delete_relationship = function (req, res) {
  Relationship.remove({
    _id: req.params.relId
  }, function (err, relationship) {
    if (err)
      res.send(err);
    res.json({ message: 'Friend successfully deleted' });
  });
};

*/
