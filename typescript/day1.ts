import { readFileSync } from "fs";

const data = readFileSync("./input/day1.txt").toString();

const lines = data.split("\n");
const firstList: number[] = [];
const secondList: number[] = [];

for (const line of lines) {
	const [first, second] = line.split("   ");
	firstList.push(parseInt(first));
	secondList.push(parseInt(second));
}

firstList.sort();
secondList.sort();

const distances = firstList.map((firstNum, index) =>
	Math.abs(firstNum - secondList[index])
);

const totalDistance = distances.reduce(
	(total, distance) => total + distance,
	0
);

console.log("Total distances: " + totalDistance);
