const inputNumber = document.getElementById('input_number')
const inputResponse = document.getElementById('input_response')

inputNumber.addEventListener('input', () => {
    inputNumber.value = inputNumber.value.replace(/[^0-9+\-*/%.() ]/g, '');
});

function maxContent(){
    const modalError = document.getElementById('modal_error')
    const maxSize = 15
    if (inputNumber.value.length > maxSize) {
        inputNumber.value = inputNumber.value.slice(0, maxSize)
        modalError.style.display = 'flex'
        setTimeout(() =>{
            modalError.style.display = 'none'
        }, 3000)
    }
}

function clearAll(){
    inputNumber.value = ""
    inputResponse.value = ""
    inputNumber.focus()
}
document.addEventListener("keydown", function(event){
    if (event.key === "C" || event.key === "c"){
        clearAll()
    }
})

function clearOne(){
    inputNumber.value = inputNumber.value.slice(0, -1)
    //inputResponse.value = ""
    inputNumber.focus()
}

function clickButton(value){
    if (value === "(") {
        const valuesInput = inputNumber.value;

        const open = (valuesInput.match(/\(/g) || []).length; //counts how much ( exists i the text open, ex result: ["(", "("]
        const close = (valuesInput.match(/\)/g) || []).length; //counts how much ( exists i the text close

        if (open > close) {
            inputNumber.value += ")";
        } else {
            inputNumber.value += "(";
        }
    } else if (value === "(-"){
        const valuesInput = inputNumber.value;

        const openNeg = (valuesInput.match(/\(-/g) || []).length; 
        const closeNeg = (valuesInput.match(/\)/g) || []).length; 

        if (openNeg > closeNeg) {
            inputNumber.value += ")";
        } else {
            inputNumber.value += "(-";
        }
    } else {
        inputNumber.value += value;
    }

    maxContent()
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        inputNumber.setAttribute('readonly', true);
    } else{
        inputNumber.focus()
    }
    
}

let previousInputNumber = "";

document.addEventListener('keydown', function(event) {
  const key = event.key;

  const keyMap = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '(': '(',
    '%': '%',
    '.': '.',
    'Enter': 'equal', 
    '=': 'equal',
    'c': 'C',
    'C': 'C'
  };

  if (key in keyMap) {
    const value = keyMap[key];
    const btn = document.getElementById('btn_' + value);

    if (btn) {
      btn.classList.add('active');

      if (key === "Enter"){
        if (inputResponse.value.length > 0){
            inputNumber.value = inputResponse.value
            inputResponse.value = ""
        } else {
            calculate()
        }
      }

      setTimeout(() => {
        btn.classList.remove('active');
      }, 200);
    }
  }
});

function calculate(){
    console.log(inputNumber.value)
    const expression = inputNumber.value

    const result = eval(expression)

    inputResponse.value = result
}