const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function commandLineParser
 * @description Parse command line.
 * @param {string[]} [commandLine=[]] Command line that need to parse.
 * @returns {{action:string[],error:string[],flag:string[],option:object}} Parse result.
 */
function commandLineParser(commandLine = []) {
	if (advancedDetermine.isArray(commandLine) === false) {
		throw new TypeError(`Argument "commandLine" must be type of array!`);
	};
	commandLine.forEach((element, index) => {
		if (advancedDetermine.isString(element) === false) {
			throw new TypeError(`Argument "commandLine#${index}" must be type of string!`);
		};
	});
	let result = {
		action: [],
		error: [],
		flag: [],
		option: {}
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
			result.error.push(lineCurrent);
			continue;
		};
		if (lineCurrent.search(/^--/gu) === 0) {
			let pair = lineCurrent.replace(/^--/gu, "");
			if (
				pair.length === 0 ||
				pair.search(/^[=]/gu) !== -1 ||
				pair.search(/[=]$/gu) !== -1
			) {
				result.error.push(lineCurrent);
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
					result.error.push(lineCurrent);
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
				result.option[key] = value;
			} else {
				result.error.push(lineCurrent);
				if (typeof lineNext !== "undefined") {
					index -= 1;
				};
			};
			continue;
		};
		if (lineCurrent.search(/^-/gu) === 0) {
			let flagCurrent = lineCurrent.replace(/^-/gu, "");
			if (flagCurrent.search(/^\\?[^\n\r\s\t]+$/gu) === 0) {
				flagCurrent = flagCurrent.replace(/^\\/gu, "");
				result.flag.push(flagCurrent);
			} else {
				result.error.push(lineCurrent);
			};
			continue;
		};
		result.error.push(lineCurrent);
	};
	return result;
};
module.exports = commandLineParser;
