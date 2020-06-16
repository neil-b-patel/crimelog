document.addEventListener("DOMContentLoaded", radialChart);

function scaleRadial() {
    var domain = [0, 1],
        range = [0, 1];
  
    function scale(x) {
      var r0 = range[0] * range[0], r1 = range[1] * range[1];
      return Math.sqrt((x - domain[0]) / (domain[1] - domain[0]) * (r1 - r0) + r0);
    }
  
    scale.domain = function(_) {
      return arguments.length ? (domain = [+_[0], +_[1]], scale) : domain.slice();
    };
  
    scale.range = function(_) {
      return arguments.length ? (range = [+_[0], +_[1]], scale) : range.slice();
    };
  
    scale.ticks = function(count) {
      return d3.scaleLinear().domain(domain).ticks(count);
    };
  
    scale.tickFormat = function(count, specifier) {
      return d3.scaleLinear().domain(domain).tickFormat(count, specifier);
    };
  
    return scale;
  }

function radialChart() {
  let margin = { top: 400, right: 10, bottom: 10, left: 300},
    width = 660 - margin.left - margin.right,
    height = 660 - margin.top - margin.bottom,
    innerRadius = 200,
    outerRadius = Math.min(width, height) / 2;

  let svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.json("crime.json", function (error, data) {
    data = data.crimes;

    let x = d3.scaleBand()
        .domain( data.map( function (d) {return d.crime;} ) )
        .range( [0, 2 * Math.PI] )
        .align( 0 );

    let y = d3.scaleBand()
        .domain( [0, 10000] )
        .range( [innerRadius, outerRadius] );

    svg
      .append("g")
      .selectAll("path")
      .data(data)
      .enter()

      .append("path")
      .attr("fill", "#87c6df")
      .attr("stroke","#76d8ff")
      .attr("d", d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(function (d) {
            return y(d.count);
        })
        .startAngle(function (d) {    
            return x(d.crime);
        })
        .endAngle(function (d) {
            return x(d.crime) + x.bandwidth();
        })
        .padAngle(0.05)
        .padRadius(innerRadius)
      );
    
    svg.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x(d.crime) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.crime) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.count)+15) + ",0)"; })
      .append("text")
        .text(function(d){return(d.crime)})
        .attr("transform", function(d) { return (x(d.crime) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "16px")
        .style("fill", "hotpink")
        .attr("alignment-baseline", "middle");
  });
}
