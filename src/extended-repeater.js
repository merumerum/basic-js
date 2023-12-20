const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  if (typeof options.separator === 'undefined') {
    options.separator = '+';
  }
  if (typeof options.additionSeparator === 'undefined') {
    options.additionSeparator = '|';
  }

  let result = `${str}`;

  if (typeof options.addition !== 'undefined') {
    result += `${options.addition}`;
  }
  
  for (let i = 0; i < options.repeatTimes; i++) {
    for (let j = 1; j < options.additionRepeatTimes; j++) {
      if (typeof options.addition !== 'undefined' && typeof options.additionSeparator !== 'undefined') {
        result += `${options.additionSeparator}${options.addition}`;
      }
    }
    if (i === options.repeatTimes - 1) {
      break;
    } else if (typeof options.addition !== 'undefined' && typeof options.additionSeparator !== 'undefined') {
      result += `${options.separator}${str}${options.addition}`;
    } else {
      result += `${options.separator}${str}`;
    }
  }
  return result;
}

module.exports = {
  repeater
};
