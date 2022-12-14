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
    $("#suggested-rate").val(getRate()+"%")
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

        nums.boughtFor = $("#bought-for").val()
        nums.boughtYear = $("#bought-year").val()
        nums.soldFor = $("#sold-for").val();
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
    
    
        a =(nums.soldFor-nums.boughtFor)*(formula/100)
        a = a.toFixed(2)
        a = numberWithCommas(a);
    
    
        b =(nums.soldFor-nums.boughtFor)*nums.percent
        b = b.toFixed(2)
        b = numberWithCommas(b);
      
    
    //    y=\frac{x^{2}}{20}
    
        $("#output-suggested-rate").html("Tax at suggested rate  $"+a)
        $("#output-your-rate").html("Tax at your proposed rate  $"+b)

        $("#increment").html(`
        Total amount acrued over ${years} years: $${increment}
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