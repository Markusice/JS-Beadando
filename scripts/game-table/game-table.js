import { mountains } from "../mountains.js";
import { runMessageAnimation } from "../error-message/message-animation.js";
import { getElementToPlace } from "../elements/elements-utilities.js";
import { updateElementToPlace } from "../elements/elements-display-render.js";
import { seasonTypes } from "../seasons/season-types.js";
import { elementTypes } from "../elements/element-types.js";
import { updateSeasonRemainingTime } from "../seasons/season-remaining-time.js";
import { showEndOfGameMsg } from "../show-end-of-game-msg.js";
import { saveGameState } from "../save-game/save-game-state.js";

class GameTable {
  constructor() {
    this.tiles = Array(11)
      .fill(undefined)
      .map(() => Array(11).fill(0)); // zero means false in data
    this.timeUnits = 28;
    this.totalPoints = 0;
    this.seasonPoints = {};
    this.currentSeason = seasonTypes.Spring;
    this.currentSeasonPoints = 0;
    this.currentSeasonTimeUnits = 7;
    this.elementsArr = undefined;
    this.elementToPlace = undefined;
    this.missions = [];
    this.gameIsOver = false;

    mountains.forEach((numbers) => {
      const rowIdx = numbers[0] - 1;
      const colIdx = numbers[1] - 1;
      this.tiles[colIdx][rowIdx] = elementTypes.mountain; // switch indexes for html columns
    });
  }

  getGameTableDiv() {
    return document.querySelector("#main-container #game-table");
  }

  updateSeasonPoints(points) {
    this.currentSeasonPoints += points;
  }

  updateTotalPoints(points) {
    this.totalPoints += points;
  }

  updateCurrentSeasonTimeUnits(timeUnits) {
    this.currentSeasonTimeUnits -= timeUnits;
  }

  updateTimeUnits(amount) {
    this.timeUnits -= amount;
  }

  /**
   *
   * @param elementToPlace {{shape: number[][], rotation: number, time: number, type: string, mirrored: boolean}}
   * @param elementsToSaveAtPosition {Array.<Array.<number>>}
   */
  saveElements(elementToPlace, elementsToSaveAtPosition) {
    if (
      isElementsOutOfBounds(elementsToSaveAtPosition) ||
      !canElementsBePlaced(this, elementsToSaveAtPosition)
    ) {
      runMessageAnimation("Nem teheted le az elemet!");
      return;
    }
    elementsToSaveAtPosition.forEach(
      ([rowIdx, colIdx]) => (this.tiles[colIdx][rowIdx] = elementToPlace.type),
    );
    updateSeasonRemainingTime(this, elementToPlace.time);
    // console.log(`timeUnits: ${this.timeUnits}`);

    this.getNextElementToPlace();
    updateElementToPlace(this);
    saveGameState(this);
  }

  getNextElementToPlace() {
    if (this.timeUnits <= 0) {
      this.gameIsOver = true;
      showEndOfGameMsg();
      return;
    }
    this.elementToPlace = getElementToPlace(this);
  }
}

/**
 *
 * @param elementsToSaveAtPosition {Array.<Array.<number>>}
 * @returns {undefined | Array.<number>}
 */
function isElementsOutOfBounds(elementsToSaveAtPosition) {
  return elementsToSaveAtPosition.find(
    ([rowIdx, colIdx]) =>
      rowIdx > 10 || rowIdx < 0 || colIdx > 10 || colIdx < 0,
  );
}

function canElementsBePlaced(gameTable, elementsToSaveAtPosition) {
  for (const [rowIdx, colIdx] of elementsToSaveAtPosition) {
    const cellData = gameTable.tiles[colIdx][rowIdx];
    if (cellData) {
      return false;
    }
  }
  return true;
}

export { GameTable };
