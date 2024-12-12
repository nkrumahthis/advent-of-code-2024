import { readFileSync } from "fs";

const test = "125 17";

const data = readFileSync("./input/day11.txt", "utf-8");

let stones = data.split(" ").map(Number);

console.log("initial arrangement", stones);

// part 1
for (let blinks = 0; blinks < 25; blinks++) {
	let newStones = [];
	for (let i = 0; i < stones.length; i++) {
		const stone = stones[i];
		if (stone === 0) {
			newStones.push(1);
		} else {
			const stoneStr = stone.toString();
			if (stoneStr.length % 2 === 0) {
				const halfLength = stoneStr.length / 2;
				newStones.push(Number(stoneStr.slice(0, halfLength)));
				newStones.push(Number(stoneStr.slice(halfLength)));
			} else {
				newStones.push(stone * 2024);
			}
		}
	}
	stones = newStones;
}
console.log("final arrange", stones.length);


// part 2

const cache = {};

function track(stone, steps) {
	let key = `${stone} ${steps}`;

	if (key in cache) return cache[key];

	if (steps === 0) return 1;

	if (stone === 0) {
		const ret = track(1, steps - 1);
		cache[key] = ret;
		return ret;
	}

	const stoneStr = stone.toString();
	if (stoneStr.length % 2 === 0) {
		const halfLength = stoneStr.length / 2;
		const left = track(Number(stoneStr.slice(0, halfLength)), steps - 1);
		const right = track(Number(stoneStr.slice(halfLength)), steps - 1);
		const ret = left + right;
    cache[key] = ret;
    return ret;
	}

	const ret = track(stone * 2024, steps - 1);
  cache[key] = ret;
  return ret;
}

let count = 0;
let stones2 = data.split(" ").map(Number);
for (let i = 0; i < stones2.length; i++) {
	count += track(stones2[i], 75);
}
console.log(count);
