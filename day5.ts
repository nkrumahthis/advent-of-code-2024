import { readFileSync } from "fs";

const testData = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const fileData = readFileSync("./input/day5.txt", "utf-8");
// const data = testData;
const data = fileData;


const [ruleData, updateData] = data.split("\n\n");

type Rule = {
	before: number;
	after: number;
};

const rules: Rule[] = [];
ruleData.split("\n").forEach((ruleLine) => {
	const [before, after] = ruleLine.split("|").map(Number);
	rules.push({ before, after });
});

const updates: number[][] = [];

updateData.split("\n").forEach((updateLine) => {
	const update = updateLine.split(",").map(Number);
	updates.push(update);
});

function isValidUpdate(update: number[]): boolean {
	const pageIndex = new Map<number, number>();
	update.forEach((upd, i) => pageIndex.set(upd, i));

	for (let rule of rules) {
		if (pageIndex.has(rule.before) && pageIndex.has(rule.after)) {
			if (pageIndex.get(rule.before)! > pageIndex.get(rule.after)!) {
				return false;
			}
		}
	}

	return true;
}

function fixUpdate(update: number[]): number[] {
    const pageIndex = new Map<number, number>();
	update.forEach((upd, i) => pageIndex.set(upd, i));

	for (let rule of rules) {
		if (pageIndex.has(rule.before) && pageIndex.has(rule.after)) {
			if (pageIndex.get(rule.before)! > pageIndex.get(rule.after)!) {
                const temp = pageIndex.get(rule.before)!
                
                update[pageIndex.get(rule.before)!] = rule.after
                update[pageIndex.get(rule.after)!] = rule.before

                pageIndex.set(rule.before, pageIndex.get(rule.after)!)
                pageIndex.set(rule.after, temp)

			}
		}
	}

    if(!isValidUpdate(update)) {
        return fixUpdate(update)
    }

    return update

}

function findMiddlePage(update) {
	const middlePageIndex = Math.floor(update.length / 2);
	return update[middlePageIndex];
}

let middlePageSum = 0;
let middleFixedPageSum = 0;

for (const update of updates) {
	if (isValidUpdate(update)) {
		middlePageSum += findMiddlePage(update);
	} else {
        const fixedUpdate = fixUpdate(update)
        middleFixedPageSum += findMiddlePage(fixedUpdate)

    }
}

console.log(middlePageSum);
console.log(middleFixedPageSum);
