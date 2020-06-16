document.addEventListener("DOMContentLoaded", bubbleChart);

function bubbleChart() {
  let height = 800;
  let width = 1200;

  let svg = d3
    .select("body")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)");

  let radiusScale = d3
    .scaleSqrt()
    .domain([0, 1])
    .range([50, 150]);

  let textScale = d3
    .scaleSqrt()
    .domain([0, 1])
    .range([15, 30]);

  let simulation = d3
    .forceSimulation()
    .force("x", d3.forceX(width / 2).strength(0.05))
    .force("y", d3.forceY(height / 2).strength(0.05))
    .force(
      "collide",
      d3.forceCollide(function(d) {
        return radiusScale(d.count) + 2;
      })
    );

  async function master() {
    let data = await d3.json("crime.json");
    data = data.crimes;

    console.log(data);

    let bubbles = svg
      .selectAll()
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "crime")
      .attr("r", function(d) {
        return radiusScale(d.count);
      })
      .attr("fill", function color(d) {
        let colors = d3.schemeSet2;
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        // let randomColorIndex = colors.indexOf(randomColor);
        // return colors.splice(randomColorIndex, 1);
        // return colors[0];
        return randomColor;
      });

    let crimeText = svg
      .selectAll()
      .data(data)
      .enter()
      .append("text")
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-weight", "600")
      .attr("font-family", "Libre Baskerville")
      .attr("font-size", function(d) {
        return textScale(d.count);
      })
      .text(function(d) {
        return `${d.crime}`;
      });

    let countText = svg
      .selectAll()
      .data(data)
      .enter()
      .append("text")
      .attr("dy", "-0.60em")
      .style("text-anchor", "middle")
      .attr("font-weight", "600")
      .attr("font-family", "Libre Baskerville")
      .attr("font-size", function(d) {
        return textScale(d.count);
      })
      .text(function(d) {
        return `${d.count}`;
      });

    simulation.nodes(data).on("tick", ticked);

    function ticked() {
      bubbles
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
      crimeText
        .attr("x", function(d) {
          return d.x;
        })
        .attr("y", function(d) {
          return d.y;
        });
      countText
        .attr("x", function(d) {
          return d.x;
        })
        .attr("y", function(d) {
          return d.y;
        });
    }
  }
  master();
}
