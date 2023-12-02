import { elementTypes } from "../../elements/element-types.js";
import { adjacentTilesUtil } from "../extra/adjacent-tiles-util.js";

/**
 *
 * @param gameTable {GameTable}
 */
function numberOfWaterTilesAdjacentOfFarmTiles(gameTable) {
  return adjacentTilesUtil(gameTable, elementTypes.farm, elementTypes.water);
}

export { numberOfWaterTilesAdjacentOfFarmTiles };
