import { readFileSync } from "fs";

function setup() {
	const data:string = readFileSync("./input/day2.txt").toString();

	const lines = data.split("\n");

	const reports: number[][] = [];

	for (const line of lines) {
		reports.push(line.split(" ").map((report) => Number(report.trim())));
	}

	return reports;
}

const reports = setup();

function checkIsSafe(report: number[]): boolean {
	let prev = report[0];
	let diffs: number[] = [];
	for (let i = 1; i < report.length; i++) {
		diffs.push(report[i] - prev);
		prev = report[i];
	}

	return (
		(diffs.every((diff) => diff > 0) || diffs.every((diff) => diff < 0)) &&
		diffs.map(Math.abs).every((diff) => diff >= 1 && diff <= 3)
	);
}

function leaveOut(report: number[], index:number) {
    return [...report.slice(0, index), ...report.slice(index + 1)]
}

let safeCount = 0;

for (let report of reports) {
    console.log("for report", report)
	const safe = checkIsSafe(report);

	if (safe) {
		safeCount++;
	} else {
        for (let i = 0; i < report.length; i++) {
            let safeWhenSkipped = checkIsSafe(leaveOut(report, i))
            console.log("-", report, "leaveOut: ", report[i], leaveOut(report, i))
            if (safeWhenSkipped) {
                console.log("  - found safe when skipping", report[i])
                safeCount++;
                break;
            }
        }
    }
    
	console.log(report, safe ? "safe" : "unsafe");
}

console.log(safeCount);
