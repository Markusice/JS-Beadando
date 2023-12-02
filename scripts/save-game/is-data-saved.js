function isDataSaved() {
  return !!JSON.parse(localStorage.getItem("gameState"));
}

export { isDataSaved };
