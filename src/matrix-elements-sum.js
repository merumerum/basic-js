const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
  const transpose = matrix[0].map((col, i) => matrix.map(row => row[i]));
  let res = 0;
  
  for (let i = 0; i < transpose.length; i++) {
    for (let j = 0; j < transpose[i].length; j++) {
      if (transpose[i][j] === 0) {
        break;
      }
      res += transpose[i][j];
    }
  }
  return res;
}

module.exports = {
  getMatrixElementsSum
};
