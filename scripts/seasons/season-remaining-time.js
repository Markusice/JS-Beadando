import { setSeason } from "./set-season.js";
import { seasonTypes } from "./season-types.js";
import { countSeasonPoints } from "./count-season-points.js";
import { checkForSurroundedMountains } from "../missions/surrounded-mountain/check-for-surrounded-mountains.js";

function updateSeasonRemainingTime(gameTable, timeUnits) {
  const seasonRemainingTime = document.querySelector(
    "#game-controls > #game-controls__season > .value",
  );

  if (gameTable.currentSeasonTimeUnits === 1 && timeUnits === 2) {
    gameTable.updateCurrentSeasonTimeUnits(1);
    gameTable.updateTimeUnits(1);
  } else {
    gameTable.updateCurrentSeasonTimeUnits(timeUnits);
    gameTable.updateTimeUnits(timeUnits);
  }
  seasonRemainingTime.innerText = gameTable.currentSeasonTimeUnits;

  if (gameTable.currentSeasonTimeUnits === 0) {
    countSeasonPoints(gameTable, checkForSurroundedMountains(gameTable)); // count season points before switching season
    changeSeason(gameTable);
    seasonRemainingTime.innerText = gameTable.currentSeasonTimeUnits;
  }
}

function changeSeason(gameTable) {
  // stringify for local storage data
  switch (JSON.stringify(gameTable.currentSeason)) {
    case JSON.stringify(seasonTypes.Spring):
      setSeason(gameTable, seasonTypes.Summer);
      break;
    case JSON.stringify(seasonTypes.Summer):
      setSeason(gameTable, seasonTypes.Autumn);
      break;
    case JSON.stringify(seasonTypes.Autumn):
      setSeason(gameTable, seasonTypes.Winter);
      break;
    case JSON.stringify(seasonTypes.Winter):
      break;
  }
}

export { updateSeasonRemainingTime };
