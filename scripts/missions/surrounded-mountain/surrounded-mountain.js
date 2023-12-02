import { elementTypes } from "../../elements/element-types.js";
import { goldOutlineColor } from "./gold-outline-color.js";

function setSurroundedMountainData() {
  const surroundedMountainTiles = new Array(3)
    .fill(undefined)
    .map(() => new Array(3).fill(""));

  surroundedMountainTiles[1][0] = elementTypes.forest;
  surroundedMountainTiles[0][1] = elementTypes.forest;
  surroundedMountainTiles[1][1] = elementTypes.mountain;
  surroundedMountainTiles[2][1] = elementTypes.water;
  surroundedMountainTiles[1][2] = elementTypes.town;
  return surroundedMountainTiles;
}

/**
 *
 * @param points {number}
 */
function createSurroundedMountainCard(points) {
  const mainContainer = document.querySelector("#main-container");
  const gameTable = mainContainer.querySelector("#game-table");
  gameTable.style.gridRow = "span 2 / span 2";

  const gameTableGridGroup = document.createElement("div");
  gameTableGridGroup.classList.add("game-table-grid-group");

  const surroundedMountainContainer = document.createElement("article");
  surroundedMountainContainer.classList.add("surrounded-mountain");

  const mountainTable = document.createElement("div");
  mountainTable.classList.add("surrounded-mountain__table");

  for (let i = 0; i < 3; i++) {
    const col = document.createElement("div");
    for (let j = 0; j < 3; j++) {
      const row = document.createElement("div");
      col.appendChild(row);
    }
    mountainTable.appendChild(col);
  }
  const mountainFlexGroup = document.createElement("div");
  mountainFlexGroup.classList.add("surrounded-mountain__flex-group");

  const title = document.createElement("h2");
  title.innerText = "Körbekerített Hegy mező";

  const point = document.createElement("p");
  point.innerText = `${points}p`;

  mountainFlexGroup.appendChild(title);
  mountainFlexGroup.appendChild(point);

  surroundedMountainContainer.appendChild(mountainTable);
  surroundedMountainContainer.appendChild(mountainFlexGroup);

  mainContainer.replaceChild(gameTableGridGroup, gameTable);
  gameTableGridGroup.appendChild(gameTable);
  gameTableGridGroup.appendChild(surroundedMountainContainer);

  const surroundedMountainData = setSurroundedMountainData();
  renderSurroundedMountainTable(surroundedMountainData, mountainTable);
}

function renderSurroundedMountainTable(data, table) {
  data.forEach((col, colIdx) => {
    const tableColumn = table.querySelector(
      `.${table.className} > div:nth-child(${colIdx + 1})`,
    );
    col.forEach((row, rowIdx) => {
      const tableRow = tableColumn.querySelector(
        `div > div:nth-child(${rowIdx + 1})`,
      );
      if (row === elementTypes.mountain) {
        tableRow.style.outline = `0.125rem solid ${goldOutlineColor}`;
        tableRow.style.outlineOffset = "-0.125rem";
      }
      if (row !== "")
        tableRow.style.backgroundImage = `url("../images/elements/${row}_tile.svg")`;
    });
  });
}

function removeSurroundedMountainCard() {
  const mainContainer = document.querySelector("#main-container");
  const gameTable = mainContainer.querySelector("#game-table");
  gameTable.style.gridRow = null;

  const gameTableGridGroup = mainContainer.querySelector(
    ".game-table-grid-group",
  );
  const surroundedMountainContainer = mainContainer.querySelector(
    ".surrounded-mountain",
  );
  surroundedMountainContainer.remove();
  mainContainer.replaceChild(gameTable, gameTableGridGroup);
}

export { createSurroundedMountainCard, removeSurroundedMountainCard };
