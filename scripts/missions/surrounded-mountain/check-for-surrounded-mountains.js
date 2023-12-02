import { elementTypes } from "../../elements/element-types.js";
import {
  createSurroundedMountainCard,
  removeSurroundedMountainCard,
} from "./surrounded-mountain.js";

/**
 *
 * @param gameTable {GameTable}
 */
function isThereSurroundedMountains(gameTable) {
  const numberOfSurroundedMountainTiles = getNumberOfSurroundedMountainTiles(
    gameTable,
    elementTypes.mountain,
  );
  if (numberOfSurroundedMountainTiles > 0)
    return numberOfSurroundedMountainTiles;
  return false;
}

/**
 *
 * @param gameTable {GameTable}
 */
function checkForSurroundedMountains(gameTable) {
  let numberOfSurroundedMountainTiles;
  if (
    (numberOfSurroundedMountainTiles = isThereSurroundedMountains(gameTable))
  ) {
    createSurroundedMountainCard(numberOfSurroundedMountainTiles);
    setTimeout(() => removeSurroundedMountainCard(), 3000);
    return numberOfSurroundedMountainTiles;
  }
  return 0;
}

function getNumberOfSurroundedMountainTiles(gameTable, tileTypeToCount) {
  // colIdx is equal and rowIdx equals with rowIdx - 1 / rowIdx + 1
  // and colIdx equals with colIdx - 1 / colIdx + 1 and rowIdx is equal
  const adjacentTiles = gameTable.tiles.map((col, colIdx, matrix) =>
    col.map((cell, rowIdx) => {
      return !!(
        cell === tileTypeToCount &&
        matrix[colIdx - 1] &&
        matrix[colIdx - 1][rowIdx] &&
        matrix[colIdx + 1] &&
        matrix[colIdx + 1][rowIdx] &&
        matrix[colIdx][rowIdx + 1] &&
        matrix[colIdx][rowIdx - 1]
      );
    }),
  );
  return adjacentTiles
    .map((col) =>
      col.reduce(
        (counter, currentValue) => (currentValue ? counter + 1 : counter),
        0,
      ),
    )
    .reduce((counter, currentValue) => counter + currentValue, 0);
}

export { checkForSurroundedMountains };
