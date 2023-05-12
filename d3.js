
  // set the dimensions and margins of the graph
  const margin = {top: 10, right: 220, bottom: 30, left: 180},
      width = 1200 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  const svg = d3.select("#chart1")
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
        .attr("class", "small")
        .call(d3.axisBottom(x));

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




          

  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

      //adding dots
        svg.append("g")
        .call(d3.axisLeft(y).tickFormat(y => "$"+y.toLocaleString()));

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


  
  })

  



/////
var datas = [{"x":0,"y":0.07032144101036253},{"x":1,"y":0.07058451551092236},{"x":2,"y":0.07106113424991078},{"x":3,"y":0.07192062412012551},{"x":4,"y":0.07345760916499257},{"x":5,"y":0.07616536351308369},{"x":6,"y":0.08081245054420991},{"x":7,"y":0.0884406384370634},{"x":8,"y":0.10009177814512772},{"x":9,"y":0.11606468019064661},{"x":10,"y":0.135},{"x":11,"y":0.15393531980935343},{"x":12,"y":0.1699082218548723},{"x":13,"y":0.18155936156293662},{"x":14,"y":0.1891875494557901},{"x":15,"y":0.19383463648691635},{"x":16,"y":0.19654239083500746},{"x":17,"y":0.1980793758798745},{"x":18,"y":0.19893886575008923},{"x":19,"y":0.19941548448907764}]


var x = d3.scaleLinear()
.domain(d3.extent(datas, function(d) { return d.x; }))
    .range([0, width]);

var y = d3.scaleLinear()
.domain(d3.extent(datas, function(d) { return d.y; }))
    .range([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

var svg2 = d3.select("#chart2")
.append("svg")
.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg2.append("path")
    .datum(datas)
    .attr("class", "line")
    .style("stroke","red")
           .style("fill", "white")
           .style("opacity", 1)
           .style("fill", "none")
      
    .attr("d", line);

// svg2.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));


    var axisRight = d3.axisRight(y);
    

var g2 = svg2.append("g").attr("transform", "translate("+(width)+",0)").style("color","red").call(axisRight);

//LEFT AXIS TITLE
svg.append("text")
  .attr("transform", `translate(-173, 10)`)
  .attr("class","small")
  .text("Average price")

//RIGHT AXIS TITLE
svg2.append("text")
.attr("class","small")
  .attr("transform", `translate(${width+10}, 10)`)
  .text("Amount taxed")

//BOTTOM AXIS TITLE
svg.append("text")
  .attr("transform", `translate(${width+30}, ${height+22})`)
  .attr("class","small")
  .text("Year purchased");


