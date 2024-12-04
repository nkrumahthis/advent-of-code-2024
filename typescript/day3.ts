import { readFileSync } from "fs"

const testData = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
const fileData = readFileSync("./input/day3.txt", "utf-8")
const data = fileData
// const data = testData

// Part 1:
// retrieve all parts of format "mul(2-3 digit integer, 2-3 digit integer)"
const regexString = /mul\(\d{1,3},\d{1,3}\)/g
const allMatches = data.match(regexString)!

let result = 0
for (let mulCommand of allMatches) {
    // extract x and y from the mul command
    const [x, y] = mulCommand.match(/\d{1,3}/g)!.map(Number)
    
    result += x * y
}

console.log(result)

// Part 2:
// retrieve all mul commands, do commands and don't commands
const testData2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
const regexString2 = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g
const allMatches2 = data.match(regexString2)!

// execute all mul commands, stop when you see don't(), resume when you see do()
let results2 = 0
let disabled = false
for (let command of allMatches2) {
    console.log(command)
    if (command === "don't()") {
        disabled = true
    } else if (command === "do()") {
        disabled = false
    } else {
        const [x, y] = command.match(/\d{1,3}/g)!.map(Number)
        if (!disabled) {
            results2 += x * y
        }
    }
}
console.log(results2)