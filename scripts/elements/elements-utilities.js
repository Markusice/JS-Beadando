import { elements } from "./elements.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createElementsCopy(gameTable) {
  gameTable.elementsArr = [...elements];
}

function shuffleElements(gameTable) {
  shuffleArray(gameTable.elementsArr);
}

function getElementToPlace(gameTable) {
  return gameTable.elementsArr.shift();
}

function findClosestElementTile(elementToPlace) {
  const closestRowIdx = elementToPlace.shape.findIndex((row) =>
    row.includes(1),
  );
  const closestColIdx = elementToPlace.shape[closestRowIdx].findIndex(
    (col) => col === 1,
  );
  return [closestRowIdx, closestColIdx];
}

export {
  shuffleElements,
  getElementToPlace,
  findClosestElementTile,
  createElementsCopy,
};
