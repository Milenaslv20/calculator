const inputNumber = document.getElementById('input_number')
    inputNumber.addEventListener('input', () => {
        inputNumber.value = inputNumber.value.replace(/[^0-9+\-*/%.() ]/g, '');
    });

function clearAll(){
    const clearInputNumberAll = document.getElementById('input_number')
    clearInputNumberAll.value = ""
    clearInputNumberAll.focus()
}

function clearOne(){
    const valueInput = document.getElementById('input_number')
    valueInput.value = inputNumber.value.slice(0, -1)
    valueInput.focus()
}

