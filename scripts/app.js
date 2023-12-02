import { GameTable } from "./game-table/game-table.js";
import { createMountains } from "./game-table/game-table-render.js";
import { handleElements } from "./game-table/game-table-elements-render.js";
import { showElementToPlace } from "./elements/elements-display-render.js";
import { createMissionCards } from "./missions/create-mission-cards.js";
import { setSeason } from "./seasons/set-season.js";
import { seasonTypes } from "./seasons/season-types.js";
import { loadGameData } from "./save-game/load-game-data.js";
import { isDataSaved } from "./save-game/is-data-saved.js";

const gameTable = new GameTable();

if (isDataSaved()) {
  loadGameData(gameTable);
} else {
  createMountains(gameTable);
  createMissionCards(gameTable);
  setSeason(gameTable, seasonTypes.Spring);
  showElementToPlace(gameTable);
  handleElements(gameTable);
}
