
  // set the dimensions and margins of the graph
  const margin = {top: 10, right: 20, bottom: 30, left: 60},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  const svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
  //Read the data
  d3.csv("base.csv",
  
    // When reading the csv, I must format variables:
    function(d){
      return { date : d3.timeParse("%Y")(d.date), value : d.value }
    }).then(
  
    // Now I can use this dataset:
    function(data) {
  
      // Add X axis --> it is a date format
      const x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

          // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  var tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0.5)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")


  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
  }

  var mousemove = function(d) {
    tooltip
      .html("The exact value of<br>the Ground Living area is: " + d.GrLivArea)
      .style("left", (d3.pointer(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (d3.pointer(this)[1]) + "px")
  }

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  
      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.value; })])
        .range([ height, 0 ]);
      
      // Add the line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.value) })
          )



      //adding dots
        svg.append("g")
        .call(d3.axisLeft(y));

           // Add the dots
           svg.selectAll("circle")
           .data(data)
           .enter().append("circle")
           .attr("class", "dot")
           .attr("r", 3.5)
           .attr("cx", function(d) {
               return x(d.date);
           })
           .attr("cy", function(d) {
               return y(d.value)
           })
           .style("stroke","black")
           .style("fill", "white")
           .style("opacity", 1);


        //    //labels
        //    const paddingForText = 20;
        //    svg.append("g").selectAll("text")
        //    .data(data)
        //    .enter()
        //    .append("text")
        //    .attr("x", function(d) { return x(d.date) - paddingForText })
        //    .attr("y", function(d) { return y(d.value) - paddingForText })
        //    .attr("fill", "red")
        //    .style("font-size","12px")
        // //    .text(function(d) { return d.date.getFullYear()+"\n"+formatter.format(d.value) });


        svg
.append('rect')
.style("fill", "none")
.style("pointer-events", "all")
.attr('width', width)
.attr('height', height)
.on('mouseover', mouseover)
.on('mousemove', mousemove)
.on('mouseout', mouseout);




  
  })

  
  const curve = d3.line().curve(d3.curveNatural);
  const points = [[100, 60], [40, 90], [200, 80], [300, 150]];
  
  svg
      .append('path')
      .attr('d', curve(points))
      .attr('stroke', 'black')
      // with multiple points defined, if you leave out fill:none,
      // the overlapping space defined by the points is filled with
      // the default value of 'black'
      .attr('fill', 'none');
  
  //   return svg.node();
  
  // Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  
  


// What happens when the mouse move -> show the annotations at the right positions.
function mouseover() {
    focus.style("opacity", 1)
    focusText.style("opacity",1)
    }
    
    function mousemove() {
    // recover coordinate we need
    var x0 = x.invert(d3.pointer(this)[0]);
    var i = bisect(data, x0, 1);
    selectedData = data[i]

    focus
      .attr("cx", x(selectedData.x))
      .attr("cy", y(selectedData.y))
      
    focusText
      .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
      .attr("x", x(selectedData.x)+15)
      .attr("y", y(selectedData.y))
    }
    function mouseout() {
    // focus.style("opacity", 0)
    focusText.style("opacity", 0)
    }