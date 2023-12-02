import {
  numberOfFullCols,
  numberOfFullRows,
} from "../missions/basic/borderlands.js";
import { numberOfEdgeAdjacentForestTiles } from "../missions/basic/edge-of-the-forest.js";
import { numberOfRowsWithThreeForestTiles } from "../missions/basic/sleepy-valley.js";
import { numberOfWaterTilesAdjacentOfFarmTiles } from "../missions/basic/watering-potatoes.js";
import { numberOfLongestTreeLines } from "../missions/extra/treeline.js";
import { numberOfEqualFarmAndWaterTiles } from "../missions/extra/watering-canal.js";
import { numberOfTownAdjacentOfThreeTiles } from "../missions/extra/wealthy-town.js";
import { numberOfWaterTilesAdjacentOfMountainTiles } from "../missions/extra/magicians-valley.js";
import { numberOfEmptyTilesAdjacentOfTownTiles } from "../missions/extra/empty-site.js";
import { oddNumberedSilos } from "../missions/extra/odd-numbered-silos.js";
import { getNumberOfMinFiveDiffTilesRow } from "../missions/extra/rich-countryside.js";
import { getNumberOfLongestTownTilesRow } from "../missions/extra/row-of-houses.js";

/**
 *
 * @param gameTable {GameTable}
 * @param numberOfSurroundedMountainTiles {number}
 */
function countSeasonPoints(gameTable, numberOfSurroundedMountainTiles) {
  const { missionTypes } = gameTable.currentSeason;

  gameTable.missions.forEach((mission) => {
    const missionLetter = mission[1];
    if (!missionTypes.includes(missionLetter)) return; // do not count if not active mission

    const { title, point } = mission[0];
    const missionPoints = getMissionPoints(title, gameTable, point);

    mission[0].earnedPoints = missionPoints; // set earned points per mission
    gameTable.updateSeasonPoints(missionPoints);
    gameTable.updateTotalPoints(missionPoints);
    updateMissionsPoints(missionLetter, missionPoints);
  });
  updatePoints(gameTable, numberOfSurroundedMountainTiles);
  gameTable.seasonPoints[gameTable.currentSeason.id] =
    gameTable.currentSeasonPoints;
}

function updatePoints(gameTable, numberOfSurroundedMountainTiles) {
  const pointsDiv = document.querySelector("#points");
  const totalPoints = pointsDiv.querySelector("#points__total > .value");
  const currentSeasonValue = pointsDiv.querySelector(
    `#${gameTable.currentSeason.id} .value`,
  );
  gameTable.updateSeasonPoints(numberOfSurroundedMountainTiles);
  gameTable.updateTotalPoints(numberOfSurroundedMountainTiles);

  currentSeasonValue.innerText = gameTable.currentSeasonPoints;
  totalPoints.innerText = gameTable.totalPoints;
}

function updateMissionsPoints(missionLetter, missionPoints) {
  const missionCard = document.querySelector(
    `#season-cards > #cards > #${missionLetter}-mission`,
  );
  const missionCardPoints = missionCard.querySelector(".card__points > .value");
  missionCardPoints.innerText = missionPoints;
}

function getMissionPoints(title, gameTable, point) {
  const missionResult = (function () {
    switch (title) {
      case "Határvidék":
        return numberOfFullCols(gameTable) + numberOfFullRows(gameTable);
      case "Az erdő széle":
        return numberOfEdgeAdjacentForestTiles(gameTable);
      case "Álmos-völgy":
        return numberOfRowsWithThreeForestTiles(gameTable);
      case "Krumpliöntözés":
        return numberOfWaterTilesAdjacentOfFarmTiles(gameTable);
      case "Fasor":
        return numberOfLongestTreeLines(gameTable);
      case "Öntözőcsatorna":
        return numberOfEqualFarmAndWaterTiles(gameTable);
      case "Gazdag város":
        return numberOfTownAdjacentOfThreeTiles(gameTable);
      case "Mágusok völgye":
        return numberOfWaterTilesAdjacentOfMountainTiles(gameTable);
      case "Üres telek":
        return numberOfEmptyTilesAdjacentOfTownTiles(gameTable);
      case "Sorház":
        return getNumberOfLongestTownTilesRow(gameTable);
      case "Páratlan silók":
        return oddNumberedSilos(gameTable);
      case "Gazdag vidék":
        return getNumberOfMinFiveDiffTilesRow(gameTable);
    }
  })();
  return missionResult * point;
}

export { countSeasonPoints };
