const input = document.getElementById("input");
const output = document.getElementById("output");
const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let currNum = "";
let result = 0;
let lastoperation = "";

const reset = () => {
    currNum = "";
    result = 0;
    lastoperation = "";
    input.innerText = "";
    output.innerText = "";
};

const operate = (response) => {
    switch (response) {
        case "+":
            result = result + parseFloat(currNum);
            break;
        case "-":
            result = result - parseFloat(currNum);
            break;
        case "*":
            result = result * parseFloat(currNum);
            break;
        case "/":
            result = result / parseFloat(currNum);
            break;
        case "":
            if (currNum !== "") result = parseFloat(currNum);
            break;
        case "√x":
            if (result !== 0) result = result * Math.sqrt(parseFloat(currNum));
            else result = Math.sqrt(parseFloat(currNum));
            break;
        case "In()":
            if (result !== 0) result = result * Math.log(parseFloat(currNum));
            else result = Math.log(parseFloat(currNum));
            break;
        case "%":
            result = result = result % currNum;
            break;
    }
    if (!isFinite(result)) {
        reset();
        output.innerText = "Error";
    } else if (isNaN(parseInt(result))) output.innerText = "";
    else if (!Number.isInteger(result))
        output.innerText = parseFloat(result.toFixed(5));
    else output.innerText = result;
};

const calculate = (e) => {
    if (output.innerText === "Error") reset();
    const response = e.innerText;
    if (num.includes(parseInt(e.innerText))) {
        currNum = currNum.concat(response.toString());
        if (lastoperation === "√x") {
            if (result !== 0) input.innerText = result + "√" + currNum;
            else input.innerText = "√" + currNum;
        } else if (lastoperation === "In()") {
            if (result !== 0) input.innerText = result + "log(" + currNum + ")";
            else input.innerText = "In(" + currNum + ")";
        } else input.innerText = currNum;
        return;
    }
    switch (response) {
        case ".":
            if (!(currNum.indexOf(".") > -1)) {
                currNum = currNum.concat(".");
                input.innerText = currNum;
            }
            break;
        case "AC":
            reset();
            break;
        case "C":
            if (currNum % 1 !== 0) {
                let str = currNum.toString();
                str = str.substring(0, str.length - 1);
                currNum = parseFloat(str);
            } else currNum = Math.floor(currNum / 10);
            input.innerText = currNum;
            break;
        case "Π":
            currNum = Math.PI;
            input.innerText = Math.PI;
            break;
        case "√x":
            input.innerText = input.innerText.concat("√x");
            operate(lastoperation);
            lastoperation = response;
            currNum = "";
            break;
        case "log()":
            input.innerText = input.innerText.concat("log()");
            operate(lastoperation);
            lastoperation = response;
            currNum = "";
            break;
        default:
            if (
                currNum === "" &&
                lastoperation === "" &&
                response !== "√x" &&
                response !== "In()"
            )
                return;
            else if (currNum === "") {
                input.innerText = response;
                lastoperation = response;
            } else {
                input.innerText = response;
                operate(lastoperation);
                if (output.innerText === "Error") return;
                lastoperation = response;
                currNum = "";
            }
            break;
    }
};
