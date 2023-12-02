import { elementTypes } from "../../elements/element-types.js";
import { adjacentTilesUtil } from "./adjacent-tiles-util.js";

/**
 *
 * @param gameTable {GameTable}
 */
function numberOfEmptyTilesAdjacentOfTownTiles(gameTable) {
  return adjacentTilesUtil(gameTable, elementTypes.town, 0);
}

export { numberOfEmptyTilesAdjacentOfTownTiles };
