import { elementTypes } from "../../elements/element-types.js";

/**
 *
 * @param gameTable {GameTable}
 */
function numberOfRowsWithThreeForestTiles(gameTable) {
  const rowsData = [];

  for (
    let currRowIdx = 0;
    currRowIdx < gameTable.tiles[0].length;
    currRowIdx++
  ) {
    rowsData.push(
      gameTable.tiles.reduce(
        (counter, _col, colIdx, matrix) =>
          matrix[colIdx][currRowIdx] === elementTypes.forest
            ? counter + 1
            : counter,
        0,
      ),
    );
  }
  return rowsData.reduce(
    (counter, currentValue) => (currentValue === 3 ? counter + 1 : counter),
    0,
  );
}

export { numberOfRowsWithThreeForestTiles };
