const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @function parse
 * @description Parse CLI argument.
 * @param {string[]} [cliArgument=[]] CLI argument that need to parse.
 * @returns {{flag:string[],line:string[],pair:object,unparseable:string[]}} Parse result.
 */
function parse(cliArgument = []) {
	if (advancedDetermine.isArray(cliArgument) === false) {
		throw new TypeError(`Argument "option.cliArgument" must be type of array! ([NodeJS] CLI Argument Parser)`);
	};
	cliArgument.forEach((element) => {
		if (advancedDetermine.isString(element) !== true) {
			throw new TypeError(`Argument "option.cliArgument#${element}" must be type of string (non-nullable)! ([NodeJS] CLI Argument Parser)`);
		};
	});
	let result = {
		flag: [],
		line: [],
		pair: {},
		unparseable: []
	};
	for (let index = 0; index < cliArgument.length; index++) {
		let argumentCurrent = cliArgument[index],
			argumentNext = cliArgument[index + 1];
		if (argumentCurrent.search(/^-/gu) === -1) {
			result.line.push(argumentCurrent.replace(/^\\/gu, ""));
			continue;
		};
		if (argumentCurrent.search(/^---+/gu) === 0) {
			result.unparseable.push(argumentCurrent);
			continue;
		};
		if (argumentCurrent.search(/^--/gu) === 0) {
			let pair = argumentCurrent.replace(/^--/gu, "");
			if (
				pair.length === 0 ||
				pair.search(/^:=/gu) !== -1 ||
				pair.search(/:=$/gu) !== -1
			) {
				result.unparseable.push(argumentCurrent);
				continue;
			};
			let pairEqualIndex = pair.indexOf(":="),
				key,
				value;
			if (pairEqualIndex === -1) {
				if (
					typeof argumentNext === "undefined" ||
					argumentNext.search(/^-/gu) === 0
				) {
					result.unparseable.push(argumentCurrent);
					continue;
				};
				key = pair;
				value = argumentNext.replace(/^\\/gu, "");
				index += 1;
			} else {
				key = pair.slice(0, pairEqualIndex).trim();
				value = pair.slice(pairEqualIndex + 2).replace(/^\\/gu, "").trim();
			};
			if (key.search(/^\\?[\d\w\-_.]+$/gu) === 0) {
				key = key.replace(/^\\/gu, "");
				result.pair[key] = value;
			} else if (key.search(/^\\?[\d\w\-_.]+(\[\])?$/gu) === 0) {
				key = key.replace(/^\\/gu, "").replace(/\[\]$/gu, "");
				if (typeof result.pair[key] === "undefined") {
					result.pair[key] = [];
				};
				result.pair[key].push(value);
			} else {
				result.unparseable.push(argumentCurrent);
				if (typeof argumentNext !== "undefined") {
					index -= 1;
				};
			};
			continue;
		};
		if (argumentCurrent.search(/^-/gu) === 0) {
			let flag = argumentCurrent.replace(/^-/gu, "");
			if (flag.search(/^\\?[^\n\r\s\t]+$/gu) === 0) {
				flag = flag.replace(/^\\/gu, "");
				if (result.flag.includes(flag) === false) {
					result.flag.push(flag);
				};
			} else {
				result.unparseable.push(argumentCurrent);
			};
			continue;
		};
		result.unparseable.push(argumentCurrent);
	};
	return result;
};
module.exports = parse;
