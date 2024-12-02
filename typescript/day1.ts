import { readFileSync } from "fs";

// Setup
function setup() {
	const data = readFileSync("./input/day1.txt").toString();

	const lines = data.split("\n");

	const leftList: number[] = [];
	const rightList: number[] = [];

	for (const line of lines) {
		const [left, right] = line.split("   ");
		leftList.push(parseInt(left));
		rightList.push(parseInt(right));
	}

	return { leftList, rightList };
}

// Part One
function calculateTotalDistance(leftList: number[], rightList: number[]) {
	// sort the lists
	leftList.sort((a, b) => a - b);
	rightList.sort((a, b) => a - b);

	// find the distance between items on the two lists
	const distances = leftList.map((leftNum, index) =>
		Math.abs(leftNum - rightList[index])
	);
	// sum up the distances
	return distances.reduce((total, distance) => total + distance, 0);
}

// Part Two
function calculateSimilarityScore(leftList: number[], rightList: number[]) {
	const countTable: { number?: number } = {};
	// initialize items from left list
	for (const leftNum of leftList) {
		countTable[leftNum] = 0;
	}
	// count the number of times each leftNum appears in rightList
	for (const rightNum of rightList) {
		if (countTable[rightNum] >= 0) {
			countTable[rightNum]++;
		}
	}
	// Calculate a total similarity score by multiplying each left number by
	// its appearance count in the right list and then adding up.
	let similarityScore = 0;
	for (const leftNum of leftList) {
		similarityScore += leftNum * countTable[leftNum];
	}

	return similarityScore;
}

const { leftList, rightList } = setup();

console.log("Total distances: " + calculateTotalDistance(leftList, rightList));

console.log(
	"Similarity score: " + calculateSimilarityScore(leftList, rightList)
);
