<<<<<<< HEAD
var entries = [];
var total = 0;

var temp = '';
$("button").on('click', function() {
 	var val = $(this).text();

  // Got a number, add to temp
  if (!isNaN(val) || val === '.') {
    temp += val;
    $("#answer").val(temp.substring(0,10));
    
  // Got some symbol other than equals, add temp to our entries
  // then add our current symbol and clear temp
  } else if (val === 'AC') {
    entries = [];
    temp = '';
    total = 0;
    $("#answer").val('')

  // Clear last entry
  } else if (val === 'CE') {
    temp = '';
    $("#answer").val('')
    
  // Change multiply symbol to work with eval
  } else if (val === 'x') {
    entries.push(temp);
    entries.push('*');
    temp = '';
    
  // Change divide symbol to work with eval
  } else if (val === '÷') {
    entries.push(temp);
    entries.push('/');
    temp = '';

  // Got the equals sign, perform calculation
  } else if (val === '=') {
  	entries.push(temp);

    var nt = Number(entries[0]);
    for (var i = 1; i < entries.length; i++) {
      var nextNum = Number(entries[i+1])
      var symbol = entries[i];
      
      if (symbol === '+') { nt += nextNum; } 
      else if (symbol === '-') { nt -= nextNum; } 
      else if (symbol === '*') { nt *= nextNum; } 
      else if (symbol === '/') { nt /= nextNum; }
      
      i++;
    }
    
    // Swap the '-' symbol so text input handles it correctly
    if (nt < 0) {
      nt = Math.abs(nt) + '-';
    }
    
    $("#answer").val(nt);
		entries = [];
    temp = '';
    
  // Push number
  } else {
    entries.push(temp);
    entries.push(val);
    temp = '';
  }
});
||||||| merged common ancestors
=======
/*creating calculator object which stores a default display value that will change with each update
  first operand value
  a waiting for second operand thats set to false until conditions are met
  the operator value
*/

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

// Create a function that displays buttons clicked on screen
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

// A function that adds(append) a a decimal point after the operand
function inputDecimal(dot) {
	if (calculator.waitingForSecondOperand === true) return;
  
  // If the `displayValue` does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

// set function that gets operators working
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}
// list of functions that calculates your sum using the operators
const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};

// resets display and all values
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
		updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
		updateDisplay();
    return;
  }

  if (target.classList.contains('all-clear')) {
    resetCalculator();
		updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
>>>>>>> psuedocode
