nums = {};




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

        nums.boughtFor = parseInt($("#bought-for").val().replace("$","").replace(",",""))
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
      
        console.log(b)
    
    //    y=\frac{x^{2}}{20}
    
        $("#output-suggested-rate").html("Tax at suggested rate  $"+a)
        $("#output-your-rate").html("Tax at your proposed rate  <strong>$"+b+"</strong>")

        $("#increment").html(`
        Total amount acrued over <strong>${years}</strong> years: <strong>$${increment}</strong>
        `)
    }
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

function percentIncrease(year) {
  /*
  This function takes in a year and returns the corresponding percentage increase from 7% to 20% over 20 years,
  with a curve that is flatter as it approaches 20% and steeper as it approaches 7%.
  */
  if (year < 20) {
    
    const x = (year) / 20; // Scale the year to a value between 0 and 1
    const k = 3; // Controls the steepness of the curve
    const y = Math.tanh(k * (2 * x - 1)); // Apply the arctanh function to the scaled year
    const pct = (y + 1) / 2 * 0.13 + 0.07; // Scale and shift the result to the desired range
    return pct;
  }
}


let all_rates = [];

for (i=0;i<20;i++) {
  r = {"x":i,"y":percentIncrease(i)}
  all_rates.push(r)
}
console.log(JSON.stringify(all_rates))

// Jquery Dependency

$("#sold-for, #bought-for").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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


