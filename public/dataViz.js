document.addEventListener("DOMContentLoaded", barChart);
//import {requirejs}
//const fs = require("fs-extra");

//fs.readFile("/crime.json", 'utf8', (err, data) => {
// if (err) throw err;
//  console.log(data);
//});

function barChart() {
  let margin = { top: 40    , right: 20, bottom: 160, left: 40 },
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  let x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
  let y = d3.scale.linear().range([height, 0]);

  let xAxis = d3.svg
    .axis()
    .scale(x)
    .orient("bottom");

  let yAxis = d3.svg
    .axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  let svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // I can manipulate data before using it here
  d3.json("crime.json", function(error, data) {
    data = data.crimes;
    console.log(data);
    data.forEach(function(d) {
      d.count = d.count;
      d.crime = d.crime;
    });

    x.domain(
      data.map(function(d) {
        return d.crime;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.count;
      })
    ]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.6em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

    svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) {
        return x(d.crime);
      })
      .attr("width", x.rangeBand())
      .attr("y", function(d) {
        return y(d.count);
      })
      .attr("height", function(d) {
        return height - y(d.count);
      });
  });
}
