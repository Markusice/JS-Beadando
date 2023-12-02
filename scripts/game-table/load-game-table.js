function loadGameTableTiles(gameTable) {
  gameTable.tiles.forEach((col, colIdx) => {
    const gameTableDiv = gameTable.getGameTableDiv();

    const tableColumn = gameTableDiv.querySelector(
      `#game-table > div:nth-child(${colIdx + 1})`,
    );

    col.forEach((row, rowIdx) => {
      const tableRow = tableColumn.querySelector(
        `div > div:nth-child(${rowIdx + 1})`,
      );

      if (row !== 0) {
        tableRow.style.backgroundImage = `url("../images/elements/${row}_tile.svg")`;
      }
    });
  });
}

export { loadGameTableTiles };
