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