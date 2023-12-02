import { elementTypes } from "../../elements/element-types.js";
import {
  getLongestElementTypeLineLength,
  getNumberOfLongestElementTypeLines,
} from "./row-of-houses.js";

/**
 *
 * @param gameTable {GameTable}
 */
function numberOfLongestTreeLines(gameTable) {
  const colsLongestTreeLine = gameTable.tiles.map((col) =>
    getLongestElementTypeLineLength(col, elementTypes.forest),
  );
  // console.log(numberOfTrees);

  return getNumberOfLongestElementTypeLines(colsLongestTreeLine);
}

export { numberOfLongestTreeLines };
