//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.route("/")
  .get(function(req, res) {
    res.sendFile(__dirname + "/index.html");
  })
  .post(function(req, res) {
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    var options = {
      url: "https://apiv2.bitcoinaverage.com/convert/global",
      method: "GET",
      qs: {
        from: crypto,
        to: fiat,
        amount: amount
      }
    };

       request(options, function(error, response, body) {

         let data = JSON.parse(body);

         let price = data.price;

         let currentDate = data.time;

         res.write("<h1>The price of " + amount + crypto + " is " + price + fiat + "</h1>");

         res.write("<p>The current date is " + currentDate + "</p>");

         res.send();
       });
  });


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
