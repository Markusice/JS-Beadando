import { setCardData } from "./create-mission-cards.js";

function loadMissionCards(gameTable) {
  const fourMissions = gameTable.missions;

  const cards = document.querySelectorAll("#cards .card");
  cards.forEach((card, cardIdx) => {
    const cardContent = card.querySelector(".card__content");
    const cardTable = card.querySelector(".card__table");

    const cardEarnedPoints = fourMissions[cardIdx][0].earnedPoints;
    const cardPoints = cardContent.querySelector(".card__points > .value");
    cardPoints.innerText = cardEarnedPoints;

    setCardData(fourMissions, card, cardIdx, cardContent, cardTable);
  });
}

export { loadMissionCards };
