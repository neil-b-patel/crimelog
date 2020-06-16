"use strict";
const fetch = require("node-fetch");
const fs = require("fs-extra");

class CrimelogController {
  async index({ view }) {
    const url = "https://crime-scraper.herokuapp.com/";
    const resp = await fetch(url);

     // console implicitly uses stringify, but JSON is actually [Object object]
    const crimeJSON = await resp.json();
    const crimeContent = JSON.stringify(crimeJSON);

    fs.writeFile("./public/crime.json", crimeContent, "utf8", function(err) {
      if (err) {
        console.log("An error occurred while writing JSON Object to File");
        return console.log(err);
      }
    });

    //console.log("JSON file has been saved.");

    return view.render("index");
  }

  async bars({ view }) {
    const url = "https://crime-scraper.herokuapp.com/";
    const resp = await fetch(url);

    // console implicitly uses stringify, but JSON is actually [Object object]
    const crimeJSON = await resp.json();
    const crimeContent = JSON.stringify(crimeJSON);

    fs.writeFile("./public/crime.json", crimeContent, "utf8", function(err) {
      if (err) {
        console.log("An error occurred while writing JSON Object to File");
        return console.log(err);
      }
    });

    //console.log("JSON file has been saved.");

    return view.render("bars");
  }

  async bubbles({ view }) {
    const url = "https://crime-scraper.herokuapp.com/";
    const resp = await fetch(url);

    // console implicitly uses stringify, but JSON is actually [Object object]
    const crimeJSON = await resp.json();
    const crimeContent = JSON.stringify(crimeJSON);

    fs.writeFile("./public/crime.json", crimeContent, "utf8", function(err) {
      if (err) {
        console.log("An error occurred while writing JSON Object to File");
        return console.log(err);
      }
    });

    //console.log("JSON file has been saved.");

    return view.render("bubbles");
  }
}

module.exports = CrimelogController;
