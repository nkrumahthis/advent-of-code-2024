import { readFileSync } from "fs";

const testData = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
.a..........
........A...
.........A..
............
............`;

const data = readFileSync("./input/day8.txt", "utf8");

const map = data.split("\n").map((line) => line.trim().split(""));

const antennas = {};

for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[0].length; x++) {
		const freq = map[y][x];

		if (map[y][x] === ".") continue;

		if (!(freq in antennas)) {
			antennas[freq] = [];
		}
		antennas[freq].push({ x, y });
	}
}

function inBounds({ x, y }) {
	return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

let antinodeSet: Set<string> = new Set();

for (let a in antennas) {
	const positions = antennas[a];

	for (let i = 0; i < positions.length; i++) {
		for (let j = 0; j < positions.length; j++) {
			if (i === j) continue;

			const dx = positions[j].x - positions[i].x;
			const dy = positions[j].y - positions[i].y;

            let k = 0
            while(true) {
                const antinode1 = {
                    x: positions[i].x + dx * k,
                    y: positions[i].y + dy * k,
                };
                k++
    
                if (inBounds(antinode1))
                    antinodeSet.add(`x.${antinode1.x},y.${antinode1.y}`);
                else
                    break
            }
			
		}
	}
}
console.log("answer is", antinodeSet.size);
