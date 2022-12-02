nums = {};

$("#calculate").click(function(){

    nums.boughtFor = $("#boughtFor").val()
    nums.boughtYear = $("#boughtYear").val()
    nums.soldFor = $("#soldFor").val()
    nums.percent = $("#percent").val()*0.01

    a =(nums.soldFor-nums.boughtFor)*nums.percent
    a = a.toFixed(2)
    a = numberWithCommas(a);
  

    
    $("#output").html("You owe  $"+a)
})


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}