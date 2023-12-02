import { elementTypes } from "../../elements/element-types.js";

/**
 *
 * @param gameTable {GameTable}
 */
function numberOfEqualFarmAndWaterTiles(gameTable) {
  const colsNumberOfFarms = gameTable.tiles.map((col) =>
    col.reduce(
      (counter, currentValue) =>
        currentValue === elementTypes.farm ? counter + 1 : counter,
      0,
    ),
  );
  const colsNumberOfWaters = gameTable.tiles.map((col) =>
    col.reduce(
      (counter, currentValue) =>
        currentValue === elementTypes.water ? counter + 1 : counter,
      0,
    ),
  );
  const isColEqualFarmAndWater = gameTable.tiles.map(
    (_col, colIdx) =>
      colsNumberOfFarms[colIdx] >= 1 &&
      colsNumberOfWaters[colIdx] >= 1 &&
      colsNumberOfFarms[colIdx] === colsNumberOfWaters[colIdx],
  );
  return isColEqualFarmAndWater.filter((value) => value).length;
}

export { numberOfEqualFarmAndWaterTiles };
