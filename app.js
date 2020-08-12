class Calculator {
    constructor(prevOperandTextElement, curOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.curOperandTextElement = curOperandTextElement 
        this.clear()
    }

    clear() {
        this.curOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete() {
        this.curOperand = this.curOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number == '.' &&  this.curOperand.includes('.')) return
        this.curOperand = this.curOperand.toString() + number.toString() 
    }

    chooseOperation(operation) {
        if (this.curOperand == '') return
        this.operation = operation
        this.prevOperand = this.curOperand
        this.curOperand = ''
    }

    compute() {
        let prev = parseFloat(this.prevOperand)
        let curr = parseFloat(this.curOperand)
        if (isNaN(prev) || isNaN(curr)) return
        let computation
        switch(this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case 'x':
                computation = prev * curr
                break
            case ':':
                computation = prev / curr
                break
            default:
                return
        }
        this.curOperand = computation
        this.prevOperand = ''
        this.operation = undefined
    }

    updateDisplay() {
        this.curOperandTextElement.innerText = this.curOperand 
        this.prevOperandTextElement.innerText = this.prevOperand + (this.operation ? ' ' + this.operation : '')
    }
}

const buttonsNumber = document.querySelectorAll('[button-number]')
const buttonsOperand = document.querySelectorAll('[button-operand]')
const buttonDel = document.querySelector('[button-del]')
const buttonClear = document.querySelector('[button-clear]')
const buttonEqual = document.querySelector('[button-equal]')
const curOperandTextElement = document.querySelector('.current-operand')
const prevOperandTextElement = document.querySelector('.previous-operand')

const app = new Calculator(prevOperandTextElement, curOperandTextElement)

buttonsNumber.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.innerText)
        app.appendNumber(button.innerText)
        app.updateDisplay()
    })
})

buttonsOperand.forEach(button => {
    button.addEventListener('click', () => {
        app.chooseOperation(button.innerText)
        app.updateDisplay()
    })
})

buttonEqual.addEventListener('click', () => {
    app.compute()
    app.updateDisplay()
})

buttonClear.addEventListener('click', () => {
    app.clear()
    app.updateDisplay()
})

buttonDel.addEventListener('click', () => {
    console.log('clicked')
    app.delete()
    app.updateDisplay()
})
