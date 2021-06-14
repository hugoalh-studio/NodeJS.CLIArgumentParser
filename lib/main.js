const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function commandLineParser
 * @description Parse command line.
 * @param {string[]} [commandLine=[]] Command line that need to parse.
 * @returns {{action:string[],argument:object,fail:string[]}} Parse result.
 */
function commandLineParser(commandLine = []) {
	if (advancedDetermine.isArray(commandLine) === false) {
		throw new TypeError(`Argument "commandLine" must be type of array!`);
	};
	commandLine.forEach((element) => {
		if (advancedDetermine.isString(element) === false) {
			throw new TypeError(`Argument "commandLine#${element}" must be type of string!`);
		};
	});
	let result = {
		action: [],
		argument: {},
		fail: []
	};
	for (let index = 0; index < commandLine.length; index++) {
		let lineCurrent = commandLine[index],
			lineNext = commandLine[index + 1];
		if (lineCurrent.length === 0) {
			continue;
		};
		if (lineCurrent.search(/^-/gu) === -1) {
			result.action.push(lineCurrent.replace(/^\\/gu, ""));
			continue;
		};
		if (lineCurrent.search(/^---+/gu) === 0) {
			result.fail.push(lineCurrent);
			continue;
		};
		if (lineCurrent.search(/^--/gu) === 0) {
			let pair = lineCurrent.replace(/^--/gu, "");
			if (
				pair.length === 0 ||
				pair.search(/^:=/gu) !== -1 ||
				pair.search(/:=$/gu) !== -1
			) {
				result.fail.push(lineCurrent);
				continue;
			};
			let pairEqualIndex = pair.indexOf("="),
				key,
				value;
			if (pairEqualIndex === -1) {
				if (
					typeof lineNext === "undefined" ||
					lineNext.search(/^-/gu) === 0
				) {
					result.fail.push(lineCurrent);
					continue;
				};
				key = pair;
				value = lineNext.replace(/^\\/gu, "");
				index += 1;
			} else {
				key = pair.slice(0, pairEqualIndex).trim();
				value = pair.slice(pairEqualIndex + 1).replace(/^\\/gu, "").trim();
			};
			if (key.search(/^\\?[\d\w\-_.]+$/gu) === 0) {
				key = key.replace(/^\\/gu, "");
				result.argument[key] = value;
			} else {
				result.fail.push(lineCurrent);
				if (typeof lineNext !== "undefined") {
					index -= 1;
				};
			};
			continue;
		};
		if (lineCurrent.search(/^-/gu) === 0) {
			let flag = lineCurrent.replace(/^-/gu, "");
			if (flag.search(/^\\?[^\n\r\s\t]+$/gu) === 0) {
				flag = flag.replace(/^\\/gu, "");
				if (Object.keys(result.argument).includes(flag) === false) {
					result.argument[flag] = true;
				};
			} else {
				result.fail.push(lineCurrent);
			};
			continue;
		};
		result.fail.push(lineCurrent);
	};
	return result;
};
module.exports = commandLineParser;
