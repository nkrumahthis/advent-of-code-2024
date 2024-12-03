import { readFileSync } from "fs";

function setup() {
	// const data:string = readFileSync("./input/day2.txt").toString();
    const data = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

	const lines = data.split("\n");

	const reports: number[][] = [];

	for (const line of lines) {
		reports.push(line.split(" ").map((report) => Number(report.trim())));
	}

	return reports;
}

const reports = setup();

function checkSafe(report: number[]): boolean {
    let prev = report[0];
    let diffs: number[] = []
    for (let i = 1; i < report.length; i++) {
        diffs.push(report[i] - prev)
        prev = report[i]
    }

    for (let i = 0; i < report.length; i++) {
        const level = report[i];
        console.log([...report.slice(0, i), ...report.slice(i+1, report.length)], report)
        // const reportWhenSkipped = [...report.slice(0, i-1), ...report.slice(i + 1, report.length)]
        // console.log("skip", level, report, reportWhenSkipped)
    }

    let isIncreasing = diffs[0] > 0 
    let isDecreasing = diffs[0] < 0
    let violations = 0
    for (let i = 0; i < diffs.length; i++) {
        const diff = diffs[i]

        

        let isViolation = false
        if ((isIncreasing && diff < 0) || (isDecreasing && diff > 0)){
            isViolation = true
            violations++
        }

        const absDiff = Math.abs(diff)
        if (absDiff > 3 || absDiff < 1) {
            isViolation = true
            violations++
        }

        // if(isViolation) {

        //     const reportWhenSkipped = [...report.slice(0, index-1), ...report.slice(index + 1)]
        //     console.log(report, reportWhenSkipped)
        // }

        if (violations > 1) {
            return false
        }
    }
    console.log(report, violations)

    return true
}

let safeCount = 0
for (const report of reports) {
    if (checkSafe(report)) safeCount++
}

console.log(safeCount);
