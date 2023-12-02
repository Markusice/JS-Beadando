import { selectFourMissions } from "./missions-utilities.js";
import { missionImages } from "./mission-images.js";

/**
 *
 * @param gameTable {GameTable}
 */
function createMissionCards(gameTable) {
  gameTable.missions = selectFourMissions();
  const fourMissions = gameTable.missions;

  const cards = document.querySelectorAll("#cards .card");
  cards.forEach((card, cardIdx) => {
    const cardContent = card.querySelector(".card__content");
    const cardTable = card.querySelector(".card__table");

    setCardData(fourMissions, card, cardIdx, cardContent, cardTable);
  });
}

function setCardData(fourMissions, card, cardIdx, cardContent, cardTable) {
  const missionTitle = fourMissions[cardIdx][0].title;
  const cardImg = cardTable.querySelector("img");
  cardImg.src = `./images/missions/${missionImages[missionTitle]}.png`;

  const img = new Image();
  img.src = `./images/missions/${missionImages[missionTitle]}.png`;
  img.addEventListener("load", () => {
    cardImg.width = img.width;
    cardImg.height = img.height;
  });

  const cardTitle = cardContent.querySelector(".card__title");
  cardTitle.innerText = missionTitle;

  const cardDescription = cardContent.querySelector(".card__description");
  cardDescription.innerText = fourMissions[cardIdx][0].description;

  const cardLetter = cardContent.querySelector(".card__letter");
  cardLetter.innerText = fourMissions[cardIdx][1];

  card.id = `${cardLetter.innerText}-mission`;
}

export { createMissionCards, setCardData };
