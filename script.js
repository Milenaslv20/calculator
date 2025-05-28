const inputNumber = document.getElementById('input_number')
const inputResponse = document.getElementById('input_response')
const message = document.getElementById('message')
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let currentLanguage = 'english';
let messages = {
    english: {
        maxDigits: "Can't enter more than 15 digits",
        error: "An error occurred"
    },
    portuguese: {
        maxDigits: "Valor máximo de 15 dígitos",
        error: "Ocorreu um erro"
    }
};


if (isMobile) {
  inputNumber.setAttribute('readonly', true);
}

inputNumber.addEventListener('input', () => {
    inputNumber.value = inputNumber.value.replace(/[^0-9+\-*/%.() ]/g, '');
});

function languageSelect(language, id){
    currentLanguage = language;

    const allLanguageButtons = document.querySelectorAll('.language-button');
    allLanguageButtons.forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.padding = '';
        btn.style.borderRadius = '';
    });

    if(language === id){
        const selected = document.getElementById(id);
        selected.style.backgroundColor = '#0b6d5b';
        selected.style.padding = '2px';
        selected.style.borderRadius = '50px';
    }
    inputNumber.focus()
}

function maxContent(){
    const modalError = document.getElementById('modal_error')
    const maxSize = 15
    if (inputNumber.value.length > maxSize) {
        inputNumber.value = inputNumber.value.slice(0, maxSize)
        modalError.style.display = 'flex'
        message.textContent = messages[currentLanguage].maxDigits;
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

function clearOne(){
    inputNumber.value = inputNumber.value.slice(0, -1)
    inputResponse.value = ""
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
    } else if(value === "="){
        if (inputResponse.value.length > 0){
            inputNumber.value = inputResponse.value
            inputResponse.value = ""
        } else {
            calculate()
        }
    } else if(value === "C"){
        clearAll()
    } else {
        inputNumber.value += value;
    }

    maxContent()

    inputNumber.focus()
}


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

    if (key === "Backspace"){
        inputResponse.value = ""
    }

    if(key === "C" || key === "c"){
        clearAll()
    }

    if (key in keyMap) {
        const value = keyMap[key];
        const btn = document.getElementById('btn_' + value);

        if (btn) {
        btn.classList.add('active');

        if (key === "Enter" || key === "="){
            if (inputResponse.value.length > 0){
                inputNumber.value = inputResponse.value
                inputResponse.value = ""
            } else if(inputNumber.value === ""){
                inputNumber = ""
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
    try{
        const result = math.evaluate(inputNumber.value)
        inputResponse.value = result
    } catch (e){
        console.log("erro")
        message.textContent = "An error occured"
    }
}
