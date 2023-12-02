/**
 *
 * @param gameTable {GameTable}
 */
function numberOfFullCols(gameTable) {
  const colsHaveElements = gameTable.tiles.map((col) =>
    col.every((cell) => cell),
  );
  return colsHaveElements.filter((value) => value);
}

/**
 *
 * @param gameTable {GameTable}
 */
function numberOfFullRows(gameTable) {
  const fullRows = [];

  for (
    let currRowIdx = 0;
    currRowIdx < gameTable.tiles[0].length;
    currRowIdx++
  ) {
    const rowHasElements = gameTable.tiles.map(
      (_col, colIdx, matrix) => matrix[colIdx][currRowIdx] !== 0,
    );
    const rowIsFull = rowHasElements.every((value) => value);
    if (rowIsFull) fullRows.push(rowIsFull);
  }
  return fullRows.length;
}

export { numberOfFullCols, numberOfFullRows };
