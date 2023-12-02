import { getElementsToHighlight } from "../game-table/game-table-elements-render.js";

/**
 *
 * @param gameTable {GameTable}
 */
function showElementToPlace(gameTable) {
  const elementToPlace = gameTable.elementToPlace;

  const gameDisplay = document.querySelector("#game-display");
  const gameDisplayTimeUnit = gameDisplay.querySelector(
    "#game-display__time-unit",
  );
  gameDisplayTimeUnit.innerText = elementToPlace.time;
  const gameDisplayTable = gameDisplay.querySelector(
    "#game-display__game-table",
  );

  renderElementToPlace(gameDisplayTable, gameTable);
  rotateBtnListenForClick(gameDisplayTable, gameTable);
  mirrorBtnListenForClick(gameDisplayTable, gameTable);
}

/**
 *
 * @param gameDisplayTable {HTMLDivElement}
 * @param gameTable {GameTable}
 */
function renderElementToPlace(gameDisplayTable, gameTable) {
  const elementToPlace = gameTable.elementToPlace;
  const elementsToHighlight = getElementsToHighlight(elementToPlace);

  elementsToHighlight.forEach(([rowIdx, colIdx]) => {
    const cellColumn = gameDisplayTable.querySelector(
      `#game-display__game-table > div:nth-child(${colIdx + 1})`,
    );
    const cell = cellColumn.querySelector(`div > div:nth-child(${rowIdx + 1})`);
    cell.style.backgroundImage = `url("../images/elements/${elementToPlace.type}_tile.svg")`;
  });
}

/**
 *
 * @param gameTable {GameTable}
 */
function updateElementToPlace(gameTable) {
  const elementToPlace = gameTable.elementToPlace;

  const gameDisplay = document.querySelector("#game-display");
  const gameDisplayTimeUnit = gameDisplay.querySelector(
    "#game-display__time-unit",
  );
  gameDisplayTimeUnit.innerText = elementToPlace.time;

  const gameDisplayTable = gameDisplay.querySelector(
    "#game-display__game-table",
  );

  elementToPlace.shape.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      const cellColumn = gameDisplayTable.querySelector(
        `#game-display__game-table > div:nth-child(${colIdx + 1})`,
      );
      const cell = cellColumn.querySelector(
        `div > div:nth-child(${rowIdx + 1})`,
      );
      if (col) {
        cell.style.backgroundImage = `url("../images/elements/${elementToPlace.type}_tile.svg")`;
      } else {
        cell.style.backgroundImage = null;
      }
    });
  });
}

/**
 *
 * @param gameTable {GameTable}
 */
function rotateElement(gameTable) {
  gameTable.elementToPlace.rotation += 90;
  gameTable.elementToPlace.rotation %= 360;
  gameTable.elementToPlace.shape = gameTable.elementToPlace.shape.map(
    (row, i) =>
      row.map(
        (val, j) =>
          gameTable.elementToPlace.shape[
            gameTable.elementToPlace.shape.length - 1 - j
          ][i],
      ),
  );
}

/**
 *
 * @param gameDisplayTable {HTMLDivElement}
 * @param gameTable {GameTable}
 */
function rotateBtnListenForClick(gameDisplayTable, gameTable) {
  const rotateBtn = document.querySelector(
    "#game-controls__main > #rotate-btn",
  );
  rotateBtn.addEventListener("click", () => {
    rotateElement(gameTable);
    updateElementToPlace(gameTable);
  });
}

/**
 *
 * @param gameTable {GameTable}
 */
function mirrorElement(gameTable) {
  gameTable.elementToPlace.mirrored = !gameTable.elementToPlace.mirrored;
  gameTable.elementToPlace.shape = gameTable.elementToPlace.shape.map((arr) =>
    arr.reverse(),
  );
}

/**
 *
 * @param gameDisplayTable {HTMLDivElement}
 * @param gameTable {GameTable}
 */
function mirrorBtnListenForClick(gameDisplayTable, gameTable) {
  const mirrorBtn = document.querySelector(
    "#game-controls__main > #mirror-btn",
  );
  mirrorBtn.addEventListener("click", () => {
    mirrorElement(gameTable);
    updateElementToPlace(gameTable);
  });
}

export { showElementToPlace, updateElementToPlace };
