class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.clear()
    }
    clear(){
    this.currentOperand = '' 
    this.previousOperand = ''
    this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0 ,-1)
    }

    appendNumber(number){
    if (number === '.' && this.currentOperand.includes('.'))return //allow us to add just one (.)
        
    
    this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== '')
        if (this.previousOperand !== '') {
            this.compute()
        }
    this.operation = operation
    this.previousOperand =this.currentOperand
    this.currentOperand = ''
    }

    compute(){
  var computation
  const previous = parseFloat(this.previousOperand)
  const current = parseFloat(this.currentOperand)
  if (isNaN(previous) || isNaN(current)) return
      switch(this.operation){
        case '+':computation = previous + current
        break

        case '-':computation = previous - current
        break

        case '*':computation = previous * current
        break

        case '÷':computation = previous / current
        break
        
        default:
            return
        
      }
  this.currentOperand = computation
  this.operation = undefined
  this.previousOperand = ''


}
    getDisplayNumber(number){
       const stringNumber = number.toString()
       const integerDigits = parseFloat(stringNumber.split('.')[0])
       const decimalDigits = stringNumber.split('.')[1]
       let integerDisplay
       if(isNaN(integerDigits)){
        integerDigits = ''
       }else{
           integerDisplay = integerDigits.toLocaleString('en' ,{
               maximumFractionDigits:0
           })
       }
    if(decimalDigits != null){
        return `${integerDigits}.${decimalDigits}`
    }else{
        return integerDisplay
    }

    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }else{
              this.previousOperandTextElement.innerText = ''
        }
         

    }
}


const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalsButton=document.querySelector('[data-equals]')
const deleteButton=document.querySelector('[data-delete]')
const allClearButton=document.querySelector('[data-all-clear]')
const previousOperandTextElement=document.querySelector('[data-previous-operand]')
const currentOperandTextElement=document.querySelector('[data-current-operand]')


const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button =>{

button.addEventListener('click' , () =>{

calculator.appendNumber(button.innerText)
calculator.updateDisplay()
})
})


operationButtons.forEach(button =>{

    button.addEventListener('click' , () =>{
    
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    })
    })

    equalsButton.addEventListener('click',button => {

    calculator.compute()
    calculator.updateDisplay()
    })

    allClearButton.addEventListener('click',button => {

        calculator.clear()
        calculator.updateDisplay()
        })

        deleteButton.addEventListener('click',button => {

            calculator.delete()
            calculator.updateDisplay()
            })