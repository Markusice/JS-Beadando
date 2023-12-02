import { showElementToPlace } from "../elements/elements-display-render.js";
import { handleElements } from "../game-table/game-table-elements-render.js";
import { loadSeasonData } from "../seasons/load-season-data.js";
import { loadGameTableTiles } from "../game-table/load-game-table.js";
import { loadMissionCards } from "../missions/load-mission-cards.js";

function loadGameData(gameTable) {
  const gameData = JSON.parse(localStorage.getItem("gameState"));

  if (gameData) {
    Object.assign(gameTable, gameData);

    loadGameTableTiles(gameTable);
    loadMissionCards(gameTable);
    loadSeasonData(gameTable);
    showElementToPlace(gameTable);
    handleElements(gameTable);
  }
}

export { loadGameData };
