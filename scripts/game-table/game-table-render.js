import { elementTypes } from "../elements/element-types.js";

/**
 *
 * @param gameTable {GameTable}
 */
function createMountains(gameTable) {
  const gameTableDiv = gameTable.getGameTableDiv();

  gameTable.tiles.forEach((col, colIdx) => {
    const tableColumn = gameTableDiv.querySelector(
      `#game-table > div:nth-child(${colIdx + 1})`,
    );

    col.forEach((row, rowIdx) => {
      const tableRow = tableColumn.querySelector(
        `div > div:nth-child(${rowIdx + 1})`,
      );

      if (row === elementTypes.mountain) {
        tableRow.style.backgroundImage = `url("../images/elements/${row}_tile.svg")`;
      }
    });
  });
}

export { createMountains };
