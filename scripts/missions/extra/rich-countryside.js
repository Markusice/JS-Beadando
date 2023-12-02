import { hasAtLeastNDifferentTiles } from "./wealthy-town.js";

/**
 *
 * @param gameTable {GameTable}
 */
function getNumberOfMinFiveDiffTilesRow(gameTable) {
  let counter = 0;
  for (
    let currRowIdx = 0;
    currRowIdx < gameTable.tiles[0].length;
    currRowIdx++
  ) {
    const rowElements = gameTable.tiles.map(
      (col, colIdx, matrix) => matrix[colIdx][currRowIdx],
    );
    // console.log(rowElements);
    // console.log(hasAtLeastNDifferentTiles(5, rowElements));
    if (hasAtLeastNDifferentTiles(5, rowElements)) counter++;
  }
  return counter;
}

export { getNumberOfMinFiveDiffTilesRow };
