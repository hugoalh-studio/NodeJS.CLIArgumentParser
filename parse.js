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
 * @returns {{flag:string[],line:string[],pair:object,unparseable:(string|object)[]}} Parse result.
 */
function parse(cliArgument = process.argv.slice(2)) {
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
		if (argumentCurrent.search(/^\\/gu) >= 0) {
			result.line.push(argumentCurrent.replace(/^\\/gu, ""));
		} else if (argumentCurrent.search(/^-{3,}/gu) >= 0 || argumentCurrent.search(/^-{1,2}=/gu) >= 0) {
			result.unparseable.push(argumentCurrent);
		} else if (argumentCurrent.search(/^-{2}/gu) >= 0) {
			const symbolEqualIndex = argumentCurrent.indexOf(":=");
			let key,
				value;
			if (symbolEqualIndex == -1) {
				const argumentNext = cliArgument[index + 1];
				if (typeof argumentNext == "undefined" || argumentNext.search(/^-{1,}/gu) >= 0) {
					result.unparseable.push(argumentCurrent);
					continue;
				};
				if (argumentNext.search(/^\\/gu) >= 0) {
					value = argumentNext.replace(/^\\/gu, "");
				} else {
					value = argumentNext;
				};
				index += 1;
				key = argumentCurrent.replace(/^--/gu, "");
			} else {
				key = argumentCurrent.slice(2, symbolEqualIndex).trim();
				value = argumentCurrent.slice(symbolEqualIndex + 2).trim();
			};
			if (typeof result.pair[key] == "undefined") {
				result.pair[key] = value;
			} else {
				const bin = {};
				bin[key] = value;
				result.unparseable.push(bin);
			};
		} else if (argumentCurrent.search(/^-{1}/gu) >= 0) {
			if (argumentCurrent.search(/^-[\w\d.\-_$]+$/gu) >= 0) {
				const flag = argumentCurrent.replace(/^-/gu, "");
				if (result.flag.includes(flag) == false) {
					result.flag.push(flag);
				};
			} else {
				result.unparseable.push(argumentCurrent);
			};
		} else {
			result.line.push(argumentCurrent);
		};
	};
	return result;
};
module.exports = parse;
