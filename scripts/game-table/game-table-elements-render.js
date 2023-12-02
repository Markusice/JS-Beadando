import { cellBackgroundColor } from "../cell-background-color.js";
import { findClosestElementTile } from "../elements/elements-utilities.js";

function highlightElement(tableCellData, tableCell, elementToPlace) {
  tableCell.style.opacity = "0.7";

  // does not have an image/element
  if (!tableCellData) {
    tableCell.style.backgroundImage = `url("../images/elements/${elementToPlace.type}_tile.svg")`;
  } else {
    // show error
    tableCell.style.outline = "0.125rem solid #991b1b";
    tableCell.style.outlineOffset = "-0.125rem";
    tableCell.style.backgroundImage = 'url("../images/error.svg")';
    tableCell.style.backgroundColor = "#dc2626";
  }
}

function removeElementHighlight(tableCellData, tableCell) {
  tableCell.style.opacity = null;

  // does not have an image/element
  if (!tableCellData) {
    tableCell.style.backgroundImage = null;
  } else {
    // reset to default
    tableCell.style.outline = null;
    tableCell.style.outlineOffset = null;
    tableCell.style.backgroundColor = cellBackgroundColor;
    tableCell.style.backgroundImage = `url("../images/elements/${tableCellData}_tile.svg")`;
  }
}

/**
 *
 * @param elementToPlace {{shape: number[][], rotation: number, time: number, type: string, mirrored: boolean}}
 * @returns {Array.<Array.<number>>}
 */
function getElementsToHighlight(elementToPlace) {
  const elementsToHighlight = [];

  elementToPlace.shape.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      // does have element there
      if (col) {
        elementsToHighlight.push([rowIdx, colIdx]);
      }
    });
  });
  return elementsToHighlight;
}

/**
 *
 * @param elementToPlace
 * @param cellRowIdx
 * @param cellColIdx
 * @returns {Array.<Array.<number>>}
 */
function getElementsToHighlightAtPosition(
  elementToPlace,
  cellRowIdx,
  cellColIdx,
) {
  const elementsToHighlightAtPosition = [];
  const elementsToHighlight = getElementsToHighlight(elementToPlace);

  elementsToHighlight.forEach(([rowIdx, colIdx]) => {
    elementsToHighlightAtPosition.push([
      cellRowIdx + rowIdx - findClosestElementTile(elementToPlace)[0],
      cellColIdx + colIdx - findClosestElementTile(elementToPlace)[1],
    ]);
  });
  return elementsToHighlightAtPosition;
}

function highlightElementsAtPosition(
  gameTable,
  elementToPlace,
  elementsToHighlightAtPosition,
) {
  elementsToHighlightAtPosition.forEach(([rowIdx, colIdx]) => {
    const cell = checkCellsOutOfBounds(gameTable, rowIdx, colIdx);
    if (cell)
      highlightElement(gameTable.tiles[colIdx][rowIdx], cell, elementToPlace);
  });
}

function removeElementsHighlight(gameTable, elementsToHighlightAtPosition) {
  elementsToHighlightAtPosition.forEach(([rowIdx, colIdx]) => {
    const cell = checkCellsOutOfBounds(gameTable, rowIdx, colIdx);
    if (cell) removeElementHighlight(gameTable.tiles[colIdx][rowIdx], cell);
  });
}

function checkCellsOutOfBounds(gameTable, rowIdx, colIdx) {
  const cellColumn = gameTable.getGameTableDiv().children[colIdx];
  if (!cellColumn) return; // cellColumn is not in tableDiv

  return cellColumn.children[rowIdx];
}

function getRowAndColIdx(tableCell) {
  const cellColumn = tableCell.parentNode;
  const tableDiv = cellColumn.parentNode;
  const cellRowIdx = Array.from(cellColumn.children).indexOf(tableCell);
  const cellColIdx = Array.from(tableDiv.children).indexOf(cellColumn);
  return { cellRowIdx, cellColIdx };
}

/**
 *
 * @param gameTable {GameTable}
 */
function handleElements(gameTable) {
  addShowElementsEventListeners(gameTable, showElements, removeElements);
  saveElements(gameTable);

  function showElements(evt) {
    if (gameTable.gameIsOver) {
      gameTable
        .getGameTableDiv()
        .removeEventListener("mouseover", showElements);
      return;
    }

    if (evt.target.matches("div > div")) {
      const tableCell = evt.target;
      tableCell.style.cursor = "pointer";
      const { cellRowIdx, cellColIdx } = getRowAndColIdx(tableCell);

      const elementsToHighlightAtPosition = getElementsToHighlightAtPosition(
        gameTable.elementToPlace,
        cellRowIdx,
        cellColIdx,
      );
      highlightElementsAtPosition(
        gameTable,
        gameTable.elementToPlace,
        elementsToHighlightAtPosition,
      );
    }
  }

  function removeElements(evt) {
    if (gameTable.gameIsOver) {
      gameTable
        .getGameTableDiv()
        .removeEventListener("mouseout", removeElements);
      return;
    }

    if (evt.target.matches("div > div")) {
      const tableCell = evt.target;
      tableCell.style.cursor = null;
      const { cellRowIdx, cellColIdx } = getRowAndColIdx(tableCell);

      const elementsToHighlightAtPosition = getElementsToHighlightAtPosition(
        gameTable.elementToPlace,
        cellRowIdx,
        cellColIdx,
      );
      removeElementsHighlight(gameTable, elementsToHighlightAtPosition);
    }
  }
}

/**
 *
 * @param gameTable {GameTable}
 * @param showElements {function}
 * @param removeElements {function}
 */
function addShowElementsEventListeners(
  gameTable,
  showElements,
  removeElements,
) {
  gameTable.getGameTableDiv().addEventListener("mouseover", showElements);
  gameTable.getGameTableDiv().addEventListener("mouseout", removeElements);
}

function saveElements(gameTable) {
  gameTable.getGameTableDiv().addEventListener("click", saveElementsOnClick);

  function saveElementsOnClick(evt) {
    if (evt.target.matches("div > div")) {
      const tableCell = evt.target;
      const { cellRowIdx, cellColIdx } = getRowAndColIdx(tableCell);

      const elementsToSaveAtPosition = getElementsToHighlightAtPosition(
        gameTable.elementToPlace,
        cellRowIdx,
        cellColIdx,
      );
      gameTable.saveElements(
        gameTable.elementToPlace,
        elementsToSaveAtPosition,
      );
      updateGameTable(
        gameTable,
        gameTable.elementToPlace,
        elementsToSaveAtPosition,
      );
    }

    if (gameTable.gameIsOver) {
      evt.target.style.cursor = null;
      gameTable
        .getGameTableDiv()
        .removeEventListener("click", saveElementsOnClick);
    }
  }
}

function updateGameTable(gameTable, elementToPlace, elementsToSaveAtPosition) {
  elementsToSaveAtPosition.forEach(([rowIdx, colIdx]) => {
    const cell = checkCellsOutOfBounds(gameTable, rowIdx, colIdx);
    if (cell) {
      cell.style.opacity = null;
      const cellData = gameTable.tiles[colIdx][rowIdx];

      // has element there
      if (cellData) {
        cell.style.outline = null;
        cell.style.backgroundImage = `url("../images/elements/${cellData}_tile.svg")`;
        cell.style.backgroundColor = cellBackgroundColor;
      } else {
        cell.style.backgroundImage = null;
      }
    }
  });
}

export { handleElements, getElementsToHighlight };
