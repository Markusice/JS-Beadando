import { elementTypes } from "../../elements/element-types.js";

/**
 *
 * @param gameTable {GameTable}
 */
function numberOfEdgeAdjacentForestTiles(gameTable) {
  return gameTable.tiles
    .map((col, colIdx, matrix) =>
      col.filter(
        (cell, cellIdx) =>
          cell === elementTypes.forest &&
          (cellIdx === 0 ||
            cellIdx === matrix[0].length - 1 ||
            colIdx === 0 ||
            colIdx === matrix.length - 1),
      ),
    )
    .filter((col) => col.length)
    .reduce((counter, col) => counter + col.length, 0);
}

export { numberOfEdgeAdjacentForestTiles };
