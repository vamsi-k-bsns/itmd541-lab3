
//function to calculate total bill [runs when either bill input or tip slider are changed]

function calcTotal() {

    var billInput = document.getElementById('billInput').value;

    //function to limit user to two inputs after a decimal
    if (billInput.indexOf('.') !== -1){
        billInput = parseFloat(parseInt(parseFloat(billInput)*100))/100;
        document.getElementById('billInput').value = billInput;
    }

    var tipPercent = parseFloat(document.getElementById('tipSlider').value);

    //updating tip percent field
    document.getElementById('percentMeter').textContent = tipPercent + "%";

    //some conditions to focus/blur the tip percentage buttons
    if(tipPercent==10)
        document.getElementById('ten').focus();
    if(tipPercent==15)
        document.getElementById('fifteen').focus();
    if(tipPercent==20)
        document.getElementById('twenty').focus();
    if(tipPercent !== 10 && tipPercent !== 15 && tipPercent !== 20)
        //select every button in the file and run button.blur() on them all
        [...document.querySelectorAll('button')].forEach(button => button.blur());

    //updating tip value and total bill fields
    document.getElementById('tipValue').value = parseFloat((tipPercent*billInput)/100).toFixed(2);
    document.getElementById('billTotal').value = parseFloat(parseFloat(billInput) + ((tipPercent*parseFloat(billInput))/100)).toFixed(2);

}

//function to accept button press inputs and run the calculate function
function buttonPress(buttonNum){

    document.getElementById('tipSlider').value = buttonNum;
    calcTotal();

}