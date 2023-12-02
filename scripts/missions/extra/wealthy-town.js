import { elementTypes } from "../../elements/element-types.js";

/**
 *
 * @param gameTable {GameTable}
 */
function numberOfTownAdjacentOfThreeTiles(gameTable) {
  const townTilesWithAdjacentTiles = gameTable.tiles.map(
    (col, colIdx, matrix) =>
      col.map((cell, rowIdx) => {
        if (cell === elementTypes.town) {
          return [
            matrix[colIdx - 1] ? matrix[colIdx - 1][rowIdx] : false,
            matrix[colIdx + 1] ? matrix[colIdx + 1][rowIdx] : false,
            matrix[colIdx][rowIdx + 1],
            matrix[colIdx][rowIdx - 1],
          ];
        }
        return false;
      }),
  );
  // console.log(townTilesWithAdjacentTiles);
  const numberOfTownsAdjacentOfThreeDiffTilesCols =
    townTilesWithAdjacentTiles.map((col) =>
      col.reduce(
        (counter, cell) =>
          hasAtLeastNDifferentTiles(3, cell) ? counter + 1 : counter,
        0,
      ),
    );
  // console.log(numberOfTownsAdjacentOfThreeDiffTilesCols);
  return numberOfTownsAdjacentOfThreeDiffTilesCols.reduce(
    (counter, currentValue) => (currentValue > 0 ? counter + 1 : counter),
    0,
  );
}

// matrix[colIdx - 1][rowIdx], matrix[colIdx + 1][rowIdx], matrix[colIdx][rowIdx + 1], matrix[colIdx][rowIdx - 1]

/**
 *
 * @param N {number}
 * @param arr {Array}
 * @returns {boolean}
 */
function hasAtLeastNDifferentTiles(N, arr) {
  if (!arr) return false;
  if (!arr.length) return false;
  arr = arr.filter((value) => value); // do not have 0 / false in it,

  const setTiles = new Set(arr);
  return setTiles.size >= N;
}

export { numberOfTownAdjacentOfThreeTiles, hasAtLeastNDifferentTiles };
