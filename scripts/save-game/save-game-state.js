function saveGameState(gameTable) {
  if (gameTable.gameIsOver) {
    localStorage.removeItem("gameState");
  } else {
    localStorage.setItem("gameState", JSON.stringify(gameTable));
  }
}

export { saveGameState };
