"use strict";
const fetch = require("node-fetch");
const fs = require("fs-extra");

class CrimelogController {
  async index({ view }) {
    const url = "http://localhost:3000/";
    const resp = await fetch(url);
    //console.log(resp);
     // console implicitly uses stringify, but JSON is actually [Object object]
    const crimeJSON = await resp.json();
    //console.log(crimeJSON);
    const crimeContent = JSON.stringify(crimeJSON);
    //console.log(crimeContent);

    fs.writeFile("./public/crime.json", crimeContent, "utf8", function(err) {
      if (err) {
        console.log("An error occurred while writing JSON Object to File");
        return console.log(err);
      }
    });

    console.log("JSON file has been saved.");

    return view.render("index");
  }

  async bubbles({ view }) {
    const url = "http://localhost:3000/";
    const resp = await fetch(url);
    //console.log(resp);
     // console implicitly uses stringify, but JSON is actually [Object object]
    const crimeJSON = await resp.json();
    //console.log(crimeJSON);
    const crimeContent = JSON.stringify(crimeJSON);
    //console.log(crimeContent);

    fs.writeFile("./public/crime.json", crimeContent, "utf8", function(err) {
      if (err) {
        console.log("An error occurred while writing JSON Object to File");
        return console.log(err);
      }
    });

    console.log("JSON file has been saved.");

    return view.render("bubbles");
  }
}

module.exports = CrimelogController;
