import { readFileSync } from "fs";

const test_data = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const file_data = readFileSync("./input/day4.txt", "utf8");

const data = file_data;

// Part 1: find all instances of xmas in the data
const lines = data
	.split(/\n/)
	.map((line) => line.trim())
	.map((line) => line.split(""));

const ylen = lines.length - 1;
const xlen = lines[0].length - 1;

let xmasCount = 0;

function checkDirection(x, y, direction: { dx: number; dy: number }): boolean {
	function outOfBounds(newX, newY) {
		return newX < 0 || newX > xlen || newY < 0 || newY > ylen;
	}

	const result: string[] = [];
	for (let i = 0; i < 4; i++) {
		const newX = x + direction.dx * i;
		const newY = y + direction.dy * i;
		if (outOfBounds(newX, newY)) return false;
		result.push(lines[newY][newX]);
	}

	return result.join("") === "XMAS";
}

function checkAllDirections(x, y): number {
	const directions = [
		{ dx: 0, dy: 1 }, // down
		{ dx: 1, dy: 0 }, // right
		{ dx: 0, dy: -1 }, // up
		{ dx: -1, dy: 0 }, // left
		{ dx: 1, dy: 1 }, // right-down
		{ dx: 1, dy: -1 }, // right-up
		{ dx: -1, dy: 1 }, // left-down
		{ dx: -1, dy: -1 }, // left-up
	];
	let count = 0;
	for (const direction of directions) {
		if (checkDirection(x, y, direction)) count++;
	}
	return count;
}

for (let y = 0; y < lines.length; y++) {
	for (let x = 0; x < lines[y].length; x++) {
		if (lines[y][x] === "X") {
			xmasCount += checkAllDirections(x, y);
		}
	}
}

console.log("xmasCount", xmasCount);

// Part 2: of MAS in an x shape. eg:
// M.S
// .A.
// M.S
// answer is 9

// go through, look for all A, note their coordinates

const foundAs: { x: number; y: number }[] = [];
for (let y = 0; y < ylen; y++) {
	for (let x = 0; x < xlen; x++) {
		if (lines[y][x] === "A") {
			foundAs.push({ x, y });
		}
	}
}

// check all diagonals to see if they spell MAS
const diagonal = [
	{ dx: -1, dy: -1 },
	{ dx: 0, dy: 0 },
	{ dx: 1, dy: 1 },
	{ dx: 1, dy: -1 },
	{ dx: 0, dy: 0 },
	{ dx: -1, dy: 1 },
];

let possibles: string[] = [
	"MASSAM",
	"MASMAS",
	"SAMSAM",
	"MASSAM",
	"SAMMAS",
	"SAMSAM",
	"SAMSAM",
	"SAMSAM",
	"SAMSAM",
];

let count2 = 0
for (let foundA of foundAs) {
	let possible: string[] = [];
	for (let d of diagonal){
        const newY = foundA.y + d.dy
        const newX = foundA.x + d.dx;
        if (newX < 0 || newX > ylen || newY < 0 || newY > xlen) break;
		possible.push(lines[newY][newX]);
	}

	if (possible.length > 0 && possibles.indexOf(possible.join("")) > -1) count2++
}

console.log("count2", count2);