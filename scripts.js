
//function to calculate total bill [runs when either bill input or tip slider are changed]

function calcTotal() {
    var billInput = document.getElementById('billInput').value;

    if (billInput.indexOf('.') !== -1)
        billInput = parseFloat(parseInt(parseFloat(billInput)*100))/100;
    
    document.getElementById('billInput').value = billInput;

    var tipPercent = parseFloat(document.getElementById('tipSlider').value);    

    document.getElementById('tipValue').value = parseFloat((tipPercent*billInput)/100).toFixed(2);
    document.getElementById('billTotal').value = parseFloat(billInput + ((tipPercent*billInput)/100)).toFixed(2);

    

}