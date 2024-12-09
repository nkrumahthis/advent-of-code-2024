import { readFileSync } from "fs";

const testData = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

// const data = testData;
const data = readFileSync("./input/day7.txt", "utf8");

const equations = data.split("\n").map((line) => {
	const pieces = line.trim().split(": ");
	return {
		value: Number(pieces[0]),
		numbers: pieces[1].split(" ").map(Number),
	};
});

function generateOperatorCombinations(numOperators: number): string[][] {
	const operators = ["+", "*"];
	const combinations: string[][] = [];

	const generate = (current: string[]) => {
		if (current.length === numOperators) {
			combinations.push([...current]);
			return;
		}

		for (const op of operators) {
			current.push(op);
			generate(current);
			current.pop();
		}
	};

	generate([]);
	return combinations;
}

function evaluate(numbers, operators): number {
	let result = numbers[0];

	for (let i = 0; i < operators.length; i++) {
		if (operators[i] === "+") {
			result += numbers[i + 1];
		} else if (operators[i] === "*") {
			result *= numbers[i + 1];
		}
	}

	return result;
}

let totalCalibrationResult = 0;
for (const { value, numbers } of equations) {
	const combinations = generateOperatorCombinations(numbers.length - 1);
	for (const combination of combinations) {
		const result = evaluate(numbers, combination);
		if (result === value) {
			totalCalibrationResult += value;
			break;
		}
	}
}

console.log(totalCalibrationResult);
