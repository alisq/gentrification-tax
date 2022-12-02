nums = {};

$("#calculate").click(function(){

    nums.boughtFor = $("#boughtFor").val()
    nums.boughtYear = $("#boughtYear").val()
    nums.soldFor = $("#soldFor").val()
    nums.percent = $("#percent").val()*0.01


    a = (nums.soldFor-nums.boughtFor)*nums.percent;
    
    $("#output").html("$"+a)
})