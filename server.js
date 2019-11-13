// Dependencies
// ===========================================================
var express = require("express");
var mysql = require("mysql");
var orm = require("./config/orm.js");

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
// ===========================================================
var PORT = process.env.PORT || 3306;

// MySQL 
//DB Connection Information
// ===========================================================
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Philly2019",
    database: "burgers_DB"
  });
  
  // Initiate MySQL Connection.
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

// Routes
// ===========================================================

// Find all the pets ordering by the lowest price to the highest price.
orm.selectAndOrder("animal_name", "pets", "price");

// Find a pet in the pets table by an animal_name of Rachel.
orm.selectWhere("pets", "animal_name", "Rachel");

// Find the buyer with the most pets.
orm.findWhoHasMost("buyer_name", "buyer_id", "buyers", "pets");

// Listener
// Start our server so that it can begin listening to client requests.
// ===========================================================
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });