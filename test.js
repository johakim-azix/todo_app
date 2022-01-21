function f(ops) {
    let result = null
    let score = []

    ops.forEach((op, index) => {
        if (op.toLowerCase() === "c"){
            score.pop()
            return
        }
        if (op.toLowerCase() === "d"){
            score.push(score[score.length - 1]*2)
            return;
        }
        if (op.toLowerCase() === "d") {
            score.push(score[score.length - 1] + score[score.length - 2])
            return;
        }
        score.push(parseFloat(op))
    })

    return score.reduce(function (a,b) {
        return a + b
    },0)
}


const bracketOpen = "("
const bracketClose = ")"
const braceOpen = "{"
const braceClose = "}"
const squareBraceOpen = "["
const squareBraceClose = "]"

function isValid(string) {
    let isValid = true
    let chars = string.split("")
    let lastChar = null

    let results = []
    chars.forEach((char, index) =>{
        if (index !== 0){
            results.push(isMatch(lastChar+char))
        }
        lastChar = char
    })

    results.forEach((result) => {
        if (!result) isValid = false
    })

    return isValid
}

function isMatch(paire){
    return (paire === "()" || paire === "{}" || paire === "[]") 
}



function sift(string){
    let result = []
    let strArray = string.split("")
    let arrays = []
    let nonLetterCharArray = []
    let lastNonLetterIndex = 0
    strArray.forEach((char, index) => {
        if(!(/[a-zA-Z]/).test(char)) {
            let array = []
            for (let i = lastNonLetterIndex; i < index; i++) {
                array.push(strArray[i])
            }
            // console.log(array)
            arrays.push(array.reverse())
            nonLetterCharArray.push(strArray[index])
            lastNonLetterIndex = index + 1
        }
        if ((/[a-zA-Z]/).test(char) && index === (strArray.length - 1)){
            let array = []
            for (let i = lastNonLetterIndex; i < strArray.length; i++) {
                array.push(strArray[i])
            }
            arrays.push(array.reverse())
            nonLetterCharArray.push(strArray[index])
        }
    })
    arrays.reverse()
    arrays.forEach((array, index) => {

        result.push([].concat(array, nonLetterCharArray[index]))
    })
    console.log(string)
    console.log(JSON.stringify(result).replaceAll('","','').replaceAll('"','').replaceAll('"','').replaceAll('"','').replaceAll('[','').replaceAll(']','').replaceAll(',',''))
}


sift("dxgtsz-dddfffdd-pytp+h5")