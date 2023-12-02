import { elementTypes } from "../../elements/element-types.js";
import { adjacentTilesUtil } from "./adjacent-tiles-util.js";

/**
 *
 * @param gameTable {GameTable}
 */
function numberOfWaterTilesAdjacentOfMountainTiles(gameTable) {
  return adjacentTilesUtil(
    gameTable,
    elementTypes.mountain,
    elementTypes.water,
  );
}

export { numberOfWaterTilesAdjacentOfMountainTiles };
