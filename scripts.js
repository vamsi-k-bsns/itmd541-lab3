
//variable to describe current state
// 0 - default, 1 - error state
var state = 0; 

//variables for typewriter functions
var i=0,j=0;
errorText = "only enter numerical values."
defaultText = "Tip Calculator"

//variable for audio
var titleSound = new Audio('titleAudio.mp3');
var errorAudio = new Audio('errorAudio.mp3');

//function to check input and throw a message if input is invalid
function checkInput(){

    let billInput = document.getElementById('billInput').value;

    //match with a regular expression that looks for numbers with upto two decimals
    if(billInput.match(/[0-9]{1,}[.]{0,1}[0-9]{0,2}/)){

        //put the matched value in the input field
        document.getElementById('billInput').value = billInput.match(/[0-9]{1,}[.]{0,1}[0-9]{0,2}/).join('');
        //call function to calculate bill
        calcTotal();
        
    }
    else{

        //reset the input field
        document.getElementById('billInput').value = "";

    }

}


//function to check what key the user input
function detectKeys(key){

    // valid keys are:
    // Backspace, Enter, Spacebar - 8, 13, 32
    // Arrow Keys - [37-40]
    // Delete - 46
    // numbers on top row - [48-57]
    // numbers on numpad - [96-105]
    // decimal point and period - 110 and 190

    if(key == 8 || key == 13 || key == 32 || (key >= 37 && key <= 40) || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 110 || key == 190){

        console.log("valid");

        if(state == 1){
            //remove error message
            changeColor("#05c505");
            removeError();
        }
    }
    else{

        console.log("invalid");
        
        if(state == 0){
            //show error message
            errorEnable();
            changeColor("red");
            showError();
        }
        if(state == 1){
            
            changeColor("red");
            showError();

        }
    }
}

//function to accept button press inputs and run the calculate function
function buttonPress(buttonNum){

    document.getElementById('tipSlider').value = buttonNum;
    calcTotal();
    
}

//function to update fields when tip slider is moved
function tipSlide(){

    //updating tip percent field
    var tipPercent = parseFloat(document.getElementById('tipSlider').value);
    document.getElementById('percentMeter').textContent = tipPercent + "%";

    //some conditions to focus/blur the tip percentage buttons
    if(tipPercent==10){
        document.getElementById('ten').focus();
        document.getElementById('ten2').focus();
    }

    if(tipPercent==15){
        document.getElementById('fifteen').focus();
        document.getElementById('fifteen2').focus();
    }

    if(tipPercent==20){
        document.getElementById('twenty').focus();
        document.getElementById('twenty2').focus();
    }

    if(tipPercent !== 10 && tipPercent !== 15 && tipPercent !== 20){
        //select every button in the file and run button.blur() on them all
        [...document.querySelectorAll('button')].forEach(button => button.blur());
        calcTotal();
    }
    else calcTotal();

}

//function to calculate total bill
function calcTotal() {

    var billInput = document.getElementById('billInput').value;

    var tipPercent = parseFloat(document.getElementById('tipSlider').value);

    //updating tip percent field
    document.getElementById('percentMeter').textContent = tipPercent + "%";

    //updating tip value and total bill fields
    document.getElementById('tipValue').value = parseFloat((tipPercent*billInput)/100).toFixed(2);
    document.getElementById('billTotal').value = parseFloat(parseFloat(billInput) + ((tipPercent*parseFloat(billInput))/100)).toFixed(2);

}

//function to changeColor of the entire design
function changeColor(newColor){

    const body = document.body;
    const inputs = document.querySelectorAll("input");
    const buttons = document.querySelectorAll("button");
    const buttons2 = document.querySelectorAll("button:focus");

    body.style.color = newColor;

    inputs.forEach(element => {

        element.style.color = newColor;
        element.style.borderColor = newColor;

    });

}

//function to show an error
function showError(){
    
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("title1").style.display = "none";
    document.getElementById("title2").style.display = "none";
    document.getElementById("defaultButtons").style.display = "none";
    document.getElementById("errorStateButtons").style.display = "block";
    state = 1;
    
}

//function to remove error
function removeError(){
    
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("title1").style.display = "block";
    document.getElementById("title2").style.display = "block";
    document.getElementById("defaultButtons").style.display = "block";
    document.getElementById("errorStateButtons").style.display = "none";

}

//typewriter effect for error
function errorWriter() {
  if (j < errorText.length) {
    document.getElementById("errorMessage").innerHTML += errorText.charAt(j);
    j++;
    setTimeout(errorWriter, 47);
}
}

//typewriter effect for title
function titleWriter() {
    if (i < defaultText.length) {
        document.getElementById("title2").innerHTML += defaultText.charAt(i);
        i++;
        setTimeout(titleWriter, 165);
    }
}

//function to start the initial typewriter
function starter(){

    i=0;
    titleSound.play();
    titleWriter();

}

//function to start first instance of error message
function errorEnable(){

    j=0;
    errorAudio.play();
    errorWriter();

}