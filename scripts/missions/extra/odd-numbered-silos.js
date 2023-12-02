/**
 *
 * @param gameTable {GameTable}
 */
function oddNumberedSilos(gameTable) {
  const colsHaveElements = gameTable.tiles.map((col) =>
    col.every((cell) => cell),
  );
  return colsHaveElements.filter((value, index) => value && index % 2 !== 0)
    .length;
}

export { oddNumberedSilos };
