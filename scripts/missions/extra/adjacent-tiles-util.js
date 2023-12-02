function adjacentTilesUtil(gameTable, firstTileType, tileTypeToCount) {
  const firstTypeTiles = gameTable.tiles.map((col) =>
    col.map((cell) => cell === firstTileType),
  );
  // console.log(firstTypeTiles);

  // colIdx is equal and rowIdx equals with rowIdx - 1 / rowIdx + 1
  // or colIdx equals with colIdx - 1 / colIdx + 1 and rowIdx is equal
  const adjacentSecondTilesOfFirstTiles = gameTable.tiles.map((col, colIdx) =>
    col.map((cell, rowIdx) => {
      if (cell === tileTypeToCount) {
        if (firstTypeTiles[colIdx - 1] && firstTypeTiles[colIdx - 1][rowIdx])
          return true;
        else if (
          firstTypeTiles[colIdx + 1] &&
          firstTypeTiles[colIdx + 1][rowIdx]
        )
          return true;
        else if (firstTypeTiles[colIdx][rowIdx + 1]) return true;
        else if (firstTypeTiles[colIdx][rowIdx - 1]) return true;
      }
      return false;
    }),
  );
  // console.log(adjacentSecondTilesOfFirstTiles);
  return adjacentSecondTilesOfFirstTiles
    .map((col) =>
      col.reduce(
        (counter, currentValue) => (currentValue ? counter + 1 : counter),
        0,
      ),
    )
    .reduce((counter, currentValue) => counter + currentValue, 0);
}

export { adjacentTilesUtil };
