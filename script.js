const display = document.querySelector('.display');
let currentInput = '0';
let operator = null;
let prevInput = null;
let waitingForOperand = false;

function inputDigit(digit) {
    if (currentInput === '0' || waitingForOperand) {
        currentInput = digit;
        waitingForOperand = false;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

function inputDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);
    if (operator && waitingForOperand) {
        operator = nextOperator;
        return;
    }
    if (prevInput === null) {
        prevInput = inputValue;
    } else if (operator) {
        const currentValue = parseFloat(display.textContent);
        const newValue = performOperation(prevInput, operator, currentValue);
        prevInput = newValue;
        display.textContent = String(newValue);
    }
    waitingForOperand = true;
    operator = nextOperator;
}

function performOperation(num1, op, num2) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return 'Error';
            }
        default:
            return num2;
    }
}
// Function to handle keyboard input
function handleKeyboardInput(event) {
    const key = event.key;
    const validKeys = /[0-9/*\-+=.\r\n\bEnter]/; // Include '\n' for 'Enter' key
    if (validKeys.test(key)) {
        if (key >= '0' && key <= '9') {
            inputDigit(key);
        } else if (key === '.') {
            inputDecimal();
            
        } else if (key === '+') {
            handleOperator('+');
        } else if (key === '-') {
            handleOperator('-');
        } else if (key === '*') {
            handleOperator('*');
        } else if (key === '/') {
            handleOperator('/');
        } else if (key === '=' || key === 'Enter') {
            handleOperator('=');
        }
        else if (key === 'Backspace') { // Handling Backspace key
            handleBackspace();
        }
    }
}

// Add event listener for keyboard input
document.addEventListener('keydown', handleKeyboardInput);

function clearCalculator() {
    currentInput = '0';
    operator = null;
    prevInput = null;
    waitingForOperand = false;
    updateDisplay();
}
function handleBackspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}
function updateDisplay() {
    display.textContent = currentInput;
}
// Add event listeners for CE and C buttons
document.querySelector('.clear-entry').addEventListener('click', () => {
    currentInput = '0';
    updateDisplay();
});
// Add event listener for the backspace button
document.querySelector('.backspace').addEventListener('click', () => {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
});

document.querySelector('.clear').addEventListener('click', () => {
    clearCalculator();
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value >= '0' && value <= '9') {
            inputDigit(value);
        } else if (value === '.') {
            inputDecimal();
        } else if (value === 'C') {
            clearCalculator();
        } else if (value === '=') {
            handleOperator(value);
        } else {
            handleOperator(value);
        }
    });
});
