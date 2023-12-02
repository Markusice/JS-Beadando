import { setSeasonType } from "./set-season-type.js";

function loadSeasonData(gameTable) {
  const season = gameTable.currentSeason;
  setSeasonType(season);
  loadSeasonRemainingTime(gameTable);
  loadSeasonPoints(gameTable);
}

function loadSeasonRemainingTime(gameTable) {
  const seasonRemainingTime = document.querySelector(
    "#game-controls > #game-controls__season > .value",
  );
  seasonRemainingTime.innerText = gameTable.currentSeasonTimeUnits;
}

function loadSeasonPoints(gameTable) {
  const totalPoints = document.querySelector("#points__total > .value");
  totalPoints.innerText = gameTable.totalPoints;

  for (const [season, point] of Object.entries(gameTable.seasonPoints)) {
    const seasonPoint = document.querySelector(`#points > #${season} .value`);
    seasonPoint.innerText = point;
  }
}

export { loadSeasonData };
