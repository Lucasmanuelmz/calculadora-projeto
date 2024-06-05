const display = document.querySelector('.calculator_display');
const keyTab = document.querySelector('.calculator_keys');
const calculator = document.querySelector('.calculator');

function clear(key) {
  
    if (key.textContent === 'AC') {
      calculator.dataset.firstValue = ''
      calculator.dataset.modValue = ''
      calculator.dataset.operator = ''
      calculator.dataset.previousKeyType = ''
    } else {
      key.textContent = 'AC'
    }
    display.textContent = 0
    key.textContent = 'AC'
}


function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber
}

function calculate(numberOne, operator, numberTwo) {
  const n1 = parseFloat(numberOne);
  const n2 = parseFloat(numberTwo);

 if(operator === 'add') return add(n1, n2);
 if(operator === 'subtract') return subtract(n1, n2);
 if(operator === 'multiply') return multiply(n1, n2);
 if(operator === 'divide') return divide(n1, n2);
   
}

function createResultingString(key, action, keyNumber, displayNumber, previousKeyType){
  if(!action) {
   
    if(displayNumber === '0' || 
    previousKeyType === 'operator' || 
    previousKeyType === 'calculate') {
      display.textContent = keyNumber;
    }else {
      display.textContent = displayNumber + keyNumber;
    }
    calculator.dataset.previousKeyType = 'number';
  } else if(action === 'decimal') {
    if(!displayNumber.includes('.')) {
      display.textContent = displayNumber + '.'
    } else if(previousKeyType === 'operator' || 
    previousKeyType === 'calculate') {
      display.textContent = '0.'
    }
    calculator.dataset.previousKeyType = 'decimal'
  } else if(action === 'add' || 
  action === 'subtract' ||
  action === 'multiply' ||
  action === 'divide') {
  const firstValue = calculator.dataset.firstValue;
  const operator = calculator.dataset.operator;
  const secondValue = displayNumber;
  if(firstValue && 
    operator && 
    previousKeyType !== 'operator' &&
  previousKeyType !== 'calculate') {
    const resultValue = calculate(firstValue,operator, secondValue);
    display.textContent = resultValue

    calculator.dataset.firstValue = resultValue;

  } else{
    calculator.dataset.firstValue = displayNumber;
  }
  key.classList.add('is-clicked');
  calculator.dataset.previousKeyType = 'operator';
  calculator.dataset.operator = action;
  calculator.dataset.firstValue = displayNumber;
  } else if(action === 'clear') {
    clear(key)
  } else if(action === 'calculate') {
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayNumber;
   if(firstValue){
    if(previousKeyType === 'calculate'){
     firstValue = displayNumber;
     secondValue = calculator.dataset.modValue;
    }
     
    display.textContent = calculate(firstValue, operator, secondValue)
   }
   calculator.dataset.modValue = secondValue;
  calculator.dataset.previousKeyType = 'calculate';
  }  
}
keyTab.addEventListener('click', e => {
 const key = e.target;
 if(key.matches('button')) {
  const action = key.dataset.action;
  const keyNumber = key.textContent;
  const displayNumber = display.textContent;
  const previousKeyType = calculator.dataset.previousKeyType;
  createResultingString(key, action, keyNumber, displayNumber, previousKeyType);
  Array.from(key.parentNode.children).forEach((myKey => {
    myKey.classList.remove('.is-clicked');
  }))
}
});

   