function setSeasonType(season) {
  const { missionTypes } = season;

  const seasonCards = document.querySelector("#season-cards");
  const seasonValue = seasonCards.querySelector(
    "#season-cards__season > .values",
  );
  seasonValue.innerText = `${season.title} (${missionTypes})`;

  const cards = seasonCards.querySelectorAll(".card");
  cards.forEach((card) => {
    if (missionTypes.includes(card.id.charAt(0))) card.classList.add("active");
    else if (card.classList.contains("active")) card.classList.remove("active");
  });
}

export { setSeasonType };
