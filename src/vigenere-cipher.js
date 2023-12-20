const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.type = direct;
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.re = /[a-z]/;
  }

  convert(input) {
    return input.split('').filter((el) => this.re.test(el)).map((el) => this.alphabet.indexOf(el));
  }

  replace(m, newKey) {
    let res = [];
    for (let i = 0; i < m.length; i++) {
      if (this.re.test(m[i])) {
        res.push(newKey[0]);
        newKey.splice(0, 1);
      } else {
        res.push(m[i]);
      }
    }
    return res;
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    let messageConvert = this.convert(message.toLowerCase());
    let keyConvert = this.convert(key.toLowerCase());
    let messagePlusKey = [];
    let count = 0;

    while (keyConvert.length < messageConvert.length) {
      keyConvert.push(keyConvert[count]);
      count++;
    }

    for (let i = 0; i < messageConvert.length; i++) {
      let sum = messageConvert[i] + keyConvert[i];
      if (sum > 25) {
        sum = sum - 26;
      }
      messagePlusKey.push(this.alphabet[sum]);
    }

    const result = this.replace(message.toLowerCase(), messagePlusKey);
    return this.type ? result.join('').toUpperCase() : result.reverse().join('').toUpperCase();
  }

  decrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    let messageConvert = this.convert(message.toLowerCase());
    let keyConvert = this.convert(key.toLowerCase());
    let messagePlusKey = [];
    let count = 0;

    while (keyConvert.length < messageConvert.length) {
      keyConvert.push(keyConvert[count]);
      count++;
    }

    for (let i = 0; i < messageConvert.length; i++) {
      let sum = messageConvert[i] - keyConvert[i];
      if (sum < 0) {
        sum = sum + 26;
      }
      messagePlusKey.push(this.alphabet[sum]);
    }

    const result = this.replace(message.toLowerCase(), messagePlusKey);
    return this.type ? result.join('').toUpperCase() : result.reverse().join('').toUpperCase();
  }
}

module.exports = {
  VigenereCipheringMachine
};
