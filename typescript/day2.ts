import { readFileSync } from "fs";

function setup(): number[][] {
    
//     const TEST_DATA = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`
    // const data = TEST_DATA
	const data = readFileSync("./input/day2.txt", "utf-8").trim();
	return data.split("\n").map((line) => line.split(" ").map(Number));
}

const reports = setup();

// part 1
function checkIsSafe(report: number[]): boolean {
	const firstDiff = report[1] - report[0];
	let increasing = firstDiff > 0;
	let decreasing = firstDiff < 0;

	for (let i = 1; i < report.length; i++) {
		const diff = report[i] - report[i - 1];
		const absDiff = Math.abs(diff);

		if (diff === 0 || absDiff < 1 || absDiff > 3) return false;
		if ((increasing && diff < 0) || (decreasing && diff > 0)) return false;
	}

	return true;
}

let safeCount = 0;
for (const report of reports) {
	if(checkIsSafe(report)) safeCount++;
}

console.log(`Number of safe reports: ${safeCount}`);


// part 2
function isSafeWithDampener(report: number[]): boolean {
	if (checkIsSafe(report)) return true;

	for (let i = 0; i < report.length; i++) {
		if (checkIsSafe(report.slice(0, i).concat(report.slice(i + 1)))) {
			return true;
		}
	}

	return false;
}


let safeCountWithDampener = 0;

for (const report of reports) {
	if (isSafeWithDampener(report)) {
		safeCountWithDampener++;
	}
}

console.log(`Number of safe reports with dampener: ${safeCountWithDampener}`);
