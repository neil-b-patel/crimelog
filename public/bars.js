document.addEventListener("DOMContentLoaded", barChart);

function barChart() {
  let margin = { top: 40, right: 40, bottom: 160, left: 160},
    width = 600 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  let x = d3.scale.ordinal().rangeRoundBands([0, width], 0.20);
  let y = d3.scale.linear().range([height, 0]);

  let xAxis = d3.svg
    .axis()
    .scale(y)
    .orient("bottom")
    .ticks(5);

  let yAxis = d3.svg
    .axis()
    .scale(x)
    .orient("left")

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
      .style("font-size", "16px")
      .style("font-family", "Libre Baskerville")
      .style("font-weight", 600)
      .attr("dx", "-1em")
      .attr("dy", "0.55em")
      .attr("transform", "rotate(-45)");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("dy", ".85em")
      .style("text-anchor", "end")
      .text("Frequency");

    svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .style("fill", "2b87ac")
      .style("stroke", "2aaa8f")
      .style("stroke-width", 3.14)
      .style("stroke-linecap", "square")
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
