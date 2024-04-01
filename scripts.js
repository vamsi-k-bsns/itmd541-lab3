
//setting up variables
var bill = document.getElementById("bill");
var tipSlider = document.getElementById("tipSlider");
var tipPercent = document.getElementById("tipPercent");
var tipValue = document.getElementById("tipValue");
var billTotal = document.getElementById("billTotal");

var tip = 0;
var cost = 0;
var totalBill = 0;

//parsing the value from the slider into a number to display to the user
tipPercent.value = tipSlider.value;

//function to update the tip amount and total bill fields
function updateValues(event){

    tipPercent.value = parseInt(tipSlider.value);
    totalBill = 0;

    tipRate = parseInt(tipPercent.value);
    cost = parseFloat(bill.value).toFixed(2);

    //tip is calculated as tip percentage divided by 100 times the bill
    tipValue.value = (cost*(tipRate/100)).toFixed(2);

    //adding tip to initial bill to get total bill54644.5.
    totalBill = (parseFloat(cost) + parseFloat(tipValue.value)).toFixed(2);

    //displaying total bill to the user
    billTotal.value = totalBill;

}

//function to restrict what kinds of input can be typed
function formatInput(event) {
    let input = event.target.value;
    
    //replace any non-numeric input with null
    input = input.replace(/[^\d.]/g,'');


    //finding if there's a decimal point in the input
    var decimalIndex = input.indexOf('.');

    //decimal is present
    if(decimalIndex !== -1){

        //only have two places after the decimal in the input
        input = input.substring(0,decimalIndex) + "." + input.substring(decimalIndex+1,decimalIndex+3);
 
    }



    //display formatted input to user
    event.target.value = input;

    //call function to update other fields
    updateValues();
  }

