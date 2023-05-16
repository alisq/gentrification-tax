// set the dimensions and margins of the graph
const margin = {top: 10, right: 60, bottom: 30, left: 140},
width = 1000 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;
nums = {};
let modal_caption = ""

//UI stuff
$(".pics").click(function(){
  modal_contents = `<img src='${$(this).data("href")}' />`
  if ($(this).data("caption") !== undefined)  {modal_caption = "<span class='figure-caption'>"+$(this).data("caption")+"</span>"}
  $(".modal-body").html(modal_contents)
  $(".modal-footer").html(modal_caption)
})


$("#persistent--sold-for").change(function(){
    $("#sold-for").val($(this).val())
})

//y=.8^{\left(x\right)}+3   

 //= y=25-x
 //calculate();


 // THIS IS CLOSE:
 // y=\left(\frac{25}{\sqrt{X}}\right)


 $("#scroll-to-calc").click(function(){
    $(document).scrollTo("#calculator",200)
 })

$("#bought-year").change(function(){
    $("#suggested-rate").text(getRate()+"%")
})

$("#calculate").click(function(){

    calculate();
})


$("#percent").change(function(){
    calculate();
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function calculate() {




    {

        nums.boughtFor = parseInt($("#bought-for").val().replace("$","").replaceAll(",",""))
        nums.boughtYear = $("#bought-year").val()
        console.log($("#sold-for").val().replace("$","").replaceAll(",",""))
        nums.soldFor = parseInt($("#sold-for").val().replace("$","").replaceAll(",",""))
        nums.percent = $("#percent").val()*0.01

    
        years = numberWithCommas(2022-nums.boughtYear);
        increment = numberWithCommas((nums.soldFor-nums.boughtFor).toFixed(2));
    
        formula = 25-(2022-$("#bought-year").val());
    
        if (formula > 25) {
            formula = 25;
        } else if (formula < 4) {
            formula = 4;
        }
    
        $("#suggested-rate").val(formula+"%")
        
        console.log(nums)

    
        a =(nums.soldFor-nums.boughtFor)*(formula/100)
        a = a.toFixed(2)
        a = numberWithCommas(a);
    
    
        b =(nums.soldFor-nums.boughtFor)*nums.percent
        b = b.toFixed(2)
        b = numberWithCommas(b);
      
    //    y=\frac{x^{2}}{20}
    
        $("#output-suggested-rate").html("Tax at suggested rate  $"+a)
        $("#output-your-rate").html("Tax at your proposed rate  <strong>$"+b+"</strong>")

        $("#increment").html(`
        Total amount acrued over <strong>${years}</strong> years: <strong>$${increment}</strong>
        `)
    }




let xPos =  ((nums.boughtYear-2000)/22)*width+"px"
let yPos =  height-(nums.boughtFor/2000000)*height+"px"

let xPos2 = width+"px";
let yPos2 = height-(nums.soldFor/2000000)*height+"px"


let xPos3 = (nums.boughtYear-2000)/21*width+"px"
let yPos3 = (2023-nums.boughtYear)+21
console.log(yPos3)

 yPos3 = (height-nums2(yPos3)+"px")
console.log(yPos3)



var div = d3.select("body").append("div")	
.attr("class", "tooltip")				
.style("opacity", 1);

$(".rateCircle, .boughtCircle").remove();


svg2
.append("circle")
.attr("class", "rateCircle")
.attr("r", 10)
.attr("cx", xPos3 )
.attr("cy",  yPos3)


svg
.append("circle")
.attr("class", "boughtCircle")
.attr("r", 10)
.attr("cx", xPos )
.attr("cy",  yPos)
.on("mouseover", function(d) {		



  div.style("left", (d.pageX) + "px")		
  .style("top", (d.pageY - 28) + "px");	 
  div.transition()		
      .duration(200)		
      .style("opacity", .9);
          
  div.html("dddd")	
  
  })					
.on("mouseout", function(d) {		
  div.transition()		
      .duration(500)		
      .style("opacity", 0)
      
});


//labels for first dot.
    txt1 = svg.append("text")
              .attr("x",xPos).attr("y",yPos)
              .attr("id","boughtBox")
              .style("transform","translate(-30px,-60px)")
              
    l1 = txt1.append("tspan").attr("x",xPos).text("bought for: $"+formatNumber(nums.boughtFor));
    l2 = txt1.append("tspan").attr("x",xPos).attr("dy", 24).text("in: "+nums.boughtYear);
    
        
        

          
//labels for first dot.
txt2= svg.append("text")
.attr("x",xPos2).attr("y",yPos2)
.attr("id","soldBox")
.style("transform","translate(-230px,-30px)")

l1 = txt2.append("tspan").attr("x",xPos2).text("sold for $"+formatNumber(nums.soldFor));






svg
.append("circle")
.attr("class", "soldCircle")
.attr("r", 10)
.attr("cx", xPos2 )
.attr("cy",  yPos2)

}

function getRate() {
    formula = 25-(2022-$("#bought-year").val());
    
    if (formula > 25) {
        formula = 25;
    } else if (formula < 4) {
        formula = 4;
    }

    return formula
}

// function percentIncrease(year) {
//   /*
//   This function takes in a year and returns the corresponding percentage increase from 7% to 20% over 20 years,
//   with a curve that is flatter as it approaches 20% and steeper as it approaches 7%.
//   */
//   if (year < 20) {
    
//     const x = (year) / 20; // Scale the year to a value between 0 and 1
//     const k = 3; // Controls the steepness of the curve
//     const y = Math.tanh(k * (2 * x - 1)); // Apply the arctanh function to the scaled year
//     const pct = (y + 1) / 2 * 0.13 + 0.07; // Scale and shift the result to the desired range
//     return pct;
//   }
// }


// let all_rates = [];

// for (i=0;i<20;i++) {
//   r = {"x":i,"y":percentIncrease(i)}
//   all_rates.push(r)
// }
// console.log(JSON.stringify(all_rates))

// Jquery Dependency

$("#sold-for, #bought-for").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


function formatNumber(num) {
  // format number 1000000 to 1,234,567
  v = num.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return v;
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}




//initial attempt at the function via desmos

function nums1(x) {

  y = Math.pow(1.3,(x-13))*0.4+0.14 
  return y 
}


//initial attempt at the function via desmos
function nums2(x) {

  y = Math.pow(1.25,(x-13))*0.3+0.14 
  return y 
}
let datas = [];
for (let i=0;i<23;i++) {
  datas.push({"x":i,"y":nums2(23-i)})
}





  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


  
  
  // append the svg object to the body of the page
  const svg = d3.select("#chart1")
    .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
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
        .domain([0, 2000000])
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
// var datas = [{"x":0,"y":0.07032144101036253},{"x":1,"y":0.07058451551092236},{"x":2,"y":0.07106113424991078},{"x":3,"y":0.07192062412012551},{"x":4,"y":0.07345760916499257},{"x":5,"y":0.07616536351308369},{"x":6,"y":0.08081245054420991},{"x":7,"y":0.0884406384370634},{"x":8,"y":0.10009177814512772},{"x":9,"y":0.11606468019064661},{"x":10,"y":0.135},{"x":11,"y":0.15393531980935343},{"x":12,"y":0.1699082218548723},{"x":13,"y":0.18155936156293662},{"x":14,"y":0.1891875494557901},{"x":15,"y":0.19383463648691635},{"x":16,"y":0.19654239083500746},{"x":17,"y":0.1980793758798745},{"x":18,"y":0.19893886575008923},{"x":19,"y":0.19941548448907764}]


var x = d3.scaleLinear()
.domain(d3.extent(datas, function(d) { return d.x; }))
    .range([0, width]);

var y = d3.scaleLinear()
.domain([0, 3])
    .range([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

var svg2 = d3.select("#chart2")
.append("svg")
.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
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


    svg2.append("g")
        .attr("transform", `translate(0, ${height})`)
        .attr("class", "small")
        .call(d3.axisBottom(x));

// svg2.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));


    var axisRight = d3.axisRight(y);
    

var g2 = svg2.append("g").attr("transform", "translate("+(width)+",0)").style("color","red").call(axisRight.tickFormat(y => y*10+"%"));

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





  ///STACKED BAR CHART
  sampleData = [
    { label: 'Property Tax', value: 4.65 },
    { label: 'Municipal Lang and Transfer Tax', value: 0.94 },
    { label: 'Development Charges', value: 0.38 },
    { label: 'Section 37 Community Benefits', value: 0.08 },
    { label: 'Vacant Home Tax', value: 0.08 },
    { label: 'Other Tax Supported Revenues', value: 2.91 },
    { label: 'Rate Supported Revenues', value: 1.96 },
    { label: 'Federal and Provincial Subsidies', value: 4.07 },
  ]

  stackedBar(sampleData, {
    colors: ['#ff616b', '#fa9442', '#bf36e0','#ff616b', '#fa9442', '#bf36e0','#ff616b', '#fa9442', '#bf36e0']
  })

  function stackedBar (data, {
    height = 400,
    barHeight = 200,
    halfBarHeight = barHeight / 2,
    f = d3.format('.1f'),
    margin = {top: 20, right: 0, bottom: 20, left: 0},
    w = 1300,
    h = height * 0.66,
    colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"]
  } = {}) {
  
    // Have a total of values for reference from the data:
    const total = d3.sum(data, d => d.value);
    console.info('total', total);
  
    // Format the data (instead of using d3.stack()) and filter out 0 values:
    function groupDataFunc(data) {
      // use a scale to get percentage values
      const percent = d3.scaleLinear()
        .domain([0, total])
        .range([0, 100])
      // filter out data that has zero values
      // also get mapping for next placement
      // (save having to format data for d3 stack)
      let cumulative = 0
      const _data = data.map(d => {
        cumulative += d.value
        return {
          value: d.value,
          // want the cumulative to prior value (start of rect)
          cumulative: cumulative - d.value,
          label: d.label,
          percent: percent(d.value)
        }
      }).filter(d => d.value > 0)
      return _data
    };
  
    const groupData = groupDataFunc(data);
    console.info('groupData', groupData);
  
    const svg_stacked = d3.select("#bar_svg")
    .append("svg").attr("viewBox", `0 0 ${w} ${height}`)

    const sel = d3.select(svg_stacked);
    
    // set up scales for horizontal placement
    const xScale = d3.scaleLinear()
      .domain([0, total])
      .range([0, w]);
  
    const join = svg_stacked.selectAll('g')
      .data(groupData)
      .join('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  
    // stack rect for each data value
    join.append('rect')
      .attr('class', 'rect-stacked')
      .attr('x', d => xScale(d.cumulative))
      .attr('y', h / 2 - halfBarHeight)
      .attr('height', barHeight)
      .attr('width', d => xScale(d.value))
      .style('fill', (d, i) => colors[i])
      .style('stroke','black')
  
    // add values on bar
    join.append('text')
      .attr('class', 'text-value')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
      .attr('y', (h / 2) + 5)
      .text(d => d.value);
  
    // add some labels for percentages
    join.append('text')
      .attr('class', 'text-percent')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
      .attr('y', (h / 2) - (halfBarHeight * 1.1))
      .text(d => f(d.percent) + ' %');
  
    // add the labels
    join.append('text')
      .attr('class', 'text-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
      .attr('y', (h / 2) + (halfBarHeight * 1.1) + 20)
      .style('fill', (d, i) => colors[i])
      .text(d => d.label);
    
    return svg_stacked;
  }