/**
 * @function commandLineParser
 * @description Parse command line.
 * @param {string[]} [commandLine=[]] Command line that need to parse.
 * @returns {{action:string[],fault:string[],flag:string[],option:object}} Parse result.
 */
function commandLineParser(commandLine = []) {
	if (Array.isArray(commandLine) === false) {
		throw new TypeError(`Argument "commandLine" must be type of array!`);
	};
	commandLine.forEach((element, index) => {
		if (typeof element !== "string") {
			throw new TypeError(`Argument "commandLine#${index}" must be type of string!`);
		};
	});
	let result = {
		action: [],
		fault: [],
		flag: [],
		option: {}
	};
	for (let index = 0; index < commandLine.length; index++) {
		let current = commandLine[index],
			next = commandLine[index + 1];
		if (current.length === 0) {
			result.action.push(current);
		};
		if (current.search(/^-/gu) === -1) {
			result.action.push(current.replace(/^\\/gu, ""));
			continue;
		};
		if (current.search(/^---+/gu) === 0) {
			result.fault.push(current);
			continue;
		};
		if (current.search(/^--/gu) === 0) {
			let pair = current.replace(/^--/gu, "");
			if (
				pair.length === 0 ||
				pair.search(/^[=]/gu) !== -1 ||
				pair.search(/[=]$/gu) !== -1
			) {
				result.fault.push(current);
				continue;
			};
			let pairEqualIndex = pair.indexOf("="),
				key,
				value;
			if (pairEqualIndex === -1) {
				if (
					typeof next === "undefined" ||
					next.search(/^-/gu) === 0
				) {
					result.fault.push(current);
					continue;
				};
				key = pair;
				value = next.replace(/^\\/gu, "");
				index += 1;
			} else {
				key = pair.slice(0, pairEqualIndex).trim();
				value = pair.slice(pairEqualIndex + 1).replace(/^\\/gu, "").trim();
			};
			if (key.search(/^\\?[\d\w\-_.]+$/gu) === 0) {
				key = key.replace(/^\\/gu, "");
				result.option[key] = value;
			} else {
				result.fault.push(current);
				if (typeof next !== "undefined") {
					index -= 1;
				};
			};
			continue;
		};
		if (current.search(/^-/gu) === 0) {
			let flagCurrent = current.replace(/^-/gu, "");
			result.flag.push(flagCurrent);
			continue;
		};
		result.fault.push(current);
	};
	return result;
};
module.exports = commandLineParser;
