const input = document.getElementById('input')
const output = document.getElementById('output')
console.log(output.innerText)
const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

let currNum = 0
let result = 0
let lastoperation = ""

const reset = () => {
    let currNum = 0
    let result = 0
    let lastoperation = ""
}


const operation = (response) => {
    switch (response) {
        case "+":
            result = result + currNum
            output.innerText = result
            break
        case "-":
            result = result - currNum
            output.innerText = result
            break
        case "*":
            result = result * currNum
            output.innerText = result
            break
        case "/":
            result = result / currNum
            output.innerText = result
            break
        case "":
            result = currNum
            output.innerText = result
            console.log(output.innerText)
            break
        case "√x":
            result = Math.sqrt(currNum)
            output.innerText = result
            break

    }
}

const calculate = (e) => {
    const response = e.innerText
    if (num.includes(parseInt(e.innerText))) {
        currNum = currNum * 10 + parseInt(e.innerText)
        input.innerText = currNum
    }

    switch (response) {
        case ".":
            if(Number.isInteger(currNum))
            {
                input.innerText=currNum.toString().concat(".")
                currNum=parseFloat()
            }
            break
        case "AC":
            input.innerText = ""
            output.innerText = ""
            currNum = 0
            result = 0
            lastoperation = ""
            break
        case "C":
            if (currNum % 1 != 0) {
                console.log('he')
                let str = currNum.toString()
                str = str.substring(0, str.length - 1);
                currNum = parseFloat(str)
            }
            else
                currNum = Math.floor(currNum / 10)
            input.innerText = currNum
            break
        case "Π":
            currNum = Math.PI
            input.innerText = Math.PI
            break
        default:
            input.innerText = response
            operation(lastoperation)
            lastoperation = response
            currNum = 0
    }
}