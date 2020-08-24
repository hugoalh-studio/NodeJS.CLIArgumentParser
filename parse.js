/*==================
[NodeJS] CLI Argument Parser (Module) - Parse
	Language:
		NodeJS 14
==================*/
const internalService = require("./internalservice.js");
/**
 * @function parse
 * @description Parse CLI argument.
 * @param {string[]} [cliArgument=process.argv.slice(2)] CLI argument that need to parse.
 * @returns {{flag:string[],line:string[],pair:object,unparseable:string[]}} Parse result.
 */
function parse(cliArgument = process.argv.slice(2)) {
	if (Array.isArray(cliArgument) != true) {
		return internalService.prefabTypeError(`cliArgument`, "array");
	};
	cliArgument.forEach((element, index) => {
		if (typeof element != "string") {
			return internalService.prefabTypeError(`cliArgument#${index}`, "string");
		};
	});
	let result = {
		flag: [],
		line: [],
		pair: {},
		unparseable: []
	};
	for (let index = 0; index < cliArgument.length; index++) {
		const argumentCurrent = cliArgument[index];
		const argumentNext = cliArgument[index + 1];
		if (argumentCurrent.search(/^[^-]/gu) == 0) {
			result.line.push(argumentCurrent.replace(/^\\/gu, ""));
			continue;
		};
		if (argumentCurrent.search(/^-{3,}/gu) == 0) {
			result.unparseable.push(argumentCurrent);
			continue;
		};
		if (argumentCurrent.search(/^-{2}/gu) == 0) {
			let pair = argumentCurrent.replace(/^--/gu, "");
			if (pair.length == 0 || pair.search(/^:=/gu) == 0 || pair.search(/:=$/gu) >= 0) {
				result.unparseable.push(argumentCurrent);
				continue;
			};
			const pairEqualIndex = pair.indexOf(":=");
			let key,
				value;
			if (pairEqualIndex == -1) {
				if (
					typeof argumentNext == "undefined" ||
					argumentNext.search(/^-{1,}/gu) == 0
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
			if (key.search(/^\\?[\d\w\-_.]+$/gu) == 0) {
				key = key.replace(/^\\/gu, "");
				if (typeof result.pair[key] == "undefined") {
					result.pair[key] = value;
				};
			} else if (key.search(/^\\?[\d\w\-_.]+(\[\])?$/gu) == 0) {
				key = key.replace(/^\\/gu, "").replace(/\[\]$/gu, "");
				if (typeof result.pair[key] == "undefined") {
					result.pair[key] = [];
				};
				result.pair[key].push(value);
			} else {
				result.unparseable.push(argumentCurrent);
				if (typeof argumentNext != "undefined") {
					index -= 1;
				};
			};
			continue;
		};
		if (argumentCurrent.search(/^-{1}/gu) == 0) {
			let flag = argumentCurrent.replace(/^-/gu, "");
			if (flag.search(/^\\?[\d\w\-_.]+$/gu) == 0) {
				flag = flag.replace(/^\\/gu, "");
				if (result.flag.includes(flag) == false) {
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
