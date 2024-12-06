import { readFileSync } from "fs";

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const fileInput = readFileSync("./input/day6.txt", "utf8");

const input = fileInput.trim();

// Parse the input into a grid
const points = input.split("\n").map((row) => row.split(""));

const yLen = points.length;
const xLen = points[0].length;

// Find the guard's starting position and direction
let guardPos: { x: number; y: number; direction: string } | undefined;
for (let y = 0; y < yLen; y++) {
	const x = points[y].indexOf("^");
	if (x !== -1) {
		guardPos = { x, y, direction: "up" };
		break;
	}
}

const directions = ["up", "right", "down", "left"];
const deltas = {
	up: { dx: 0, dy: -1 },
	right: { dx: 1, dy: 0 },
	down: { dx: 0, dy: 1 },
	left: { dx: -1, dy: 0 },
};

// Function to simulate the guard's movement and detect loops
function simulateGuard(grid: string[][], startX: number, startY: number): boolean {
	let x = startX;
	let y = startY;
	let direction = "up";
	const visited = new Set<string>();

	while (true) {
		const state = `${x},${y},${direction}`;
		if (visited.has(state)) {
			// Loop detected
			return true;
		}
		visited.add(state);

		const { dx, dy } = deltas[direction];
		const newX = x + dx;
		const newY = y + dy;

		// Check if the guard leaves the map
		if (newX < 0 || newX >= xLen || newY < 0 || newY >= yLen) {
			return false;
		}

		// Check for obstacles
		if (grid[newY][newX] === "#") {
			// Turn right
			const currentIndex = directions.indexOf(direction);
			direction = directions[(currentIndex + 1) % 4];
		} else {
			// Move forward
			x = newX;
			y = newY;
		}
	}
}

// Find all possible obstruction positions
let loopCausingPositions = 0;
for (let y = 0; y < yLen; y++) {
	for (let x = 0; x < xLen; x++) {
		if (points[y][x] === "." && !(x === guardPos!.x && y === guardPos!.y)) {
			// Create a copy of the grid and place an obstruction
			const gridCopy = points.map((row) => [...row]);
			gridCopy[y][x] = "#";

			// Simulate the guard's movement with the obstruction
			if (simulateGuard(gridCopy, guardPos!.x, guardPos!.y)) {
				loopCausingPositions++;
			}
		}
	}
}

console.log("Number of loop-causing positions:", loopCausingPositions);
