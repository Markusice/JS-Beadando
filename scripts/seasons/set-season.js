import {
  createElementsCopy,
  getElementToPlace,
  shuffleElements,
} from "../elements/elements-utilities.js";
import { setSeasonType } from "./set-season-type.js";

function setSeason(gameTable, season) {
  gameTable.currentSeason = season;
  gameTable.currentSeasonTimeUnits = 7;
  gameTable.currentSeasonPoints = 0;

  createElementsCopy(gameTable);
  shuffleElements(gameTable);
  gameTable.elementToPlace = getElementToPlace(gameTable);

  setSeasonType(season);
}

export { setSeason };
