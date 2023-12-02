import { elementTypes } from "../../elements/element-types.js";

/**
 *
 * @param gameTable {GameTable}
 */
function getNumberOfLongestTownTilesRow(gameTable) {
  const rowsData = Array(11)
    .fill(undefined)
    .map(() => Array(11).fill(undefined));

  for (
    let currRowIdx = 0;
    currRowIdx < gameTable.tiles[0].length;
    currRowIdx++
  ) {
    gameTable.tiles.forEach(
      (_col, colIdx, matrix) =>
        (rowsData[currRowIdx][colIdx] = matrix[colIdx][currRowIdx]),
    );
  }
  // console.log(rowsData);
  const rowsLongestTownLine = rowsData.map((row) =>
    getLongestElementTypeLineLength(row, elementTypes.town),
  );
  // console.log(rowsLongestTownLine);
  // console.log(getNumberOfLongestElementTypeLines(rowsLongestTownLine));
  return getNumberOfLongestElementTypeLines(rowsLongestTownLine);
}

/**
 *
 * @param arr {Array}
 * @param elementType
 * @returns {number}
 */
function getLongestElementTypeLineLength(arr, elementType) {
  let counter = 0;
  // counter++ as long as next value is forest too

  let foundElementType = false;
  let longestElementTypeLine = 0;

  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === elementType && !foundElementType) {
      foundElementType = true;
      counter++;
    } else if (arr[j] === elementType && foundElementType) {
      counter++;
    } else if (arr[j] !== elementType && foundElementType) {
      if (counter > longestElementTypeLine) longestElementTypeLine = counter;
      counter = 0;
    }
  }
  return longestElementTypeLine;
}

/**
 *
 * @param arr {Array}
 * @returns {number}
 */
function getNumberOfLongestElementTypeLines(arr) {
  const numberOfElementTypeKeys = {};

  for (const numberOfTree of arr) {
    if (numberOfTree in numberOfElementTypeKeys) {
      numberOfElementTypeKeys[numberOfTree]++;
    } else if (numberOfTree !== 0) {
      numberOfElementTypeKeys[numberOfTree] = 1;
    }
  }
  // console.log(numberOfElementTypeKeys);
  return Object.keys(numberOfElementTypeKeys).length;
}

export {
  getNumberOfLongestTownTilesRow,
  getLongestElementTypeLineLength,
  getNumberOfLongestElementTypeLines,
};
