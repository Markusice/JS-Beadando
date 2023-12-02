import { missions } from "./missions.js";

function randomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function selectFourMissions() {
  const fourMissions = [];
  const letters = ["D", "C", "B", "A"];

  for (let i = 0; i < 4; i++) {
    const isBasic = Math.floor(Math.random() * 2);

    let randomMissionArr;

    if (isBasic) randomMissionArr = missions.basic;
    else {
      randomMissionArr = missions.extra;
    }
    let randomMission = randomArrayElement(randomMissionArr);

    while (fourMissions.find(([mission]) => mission === randomMission)) {
      randomMission = randomArrayElement(randomMissionArr);
    }
    fourMissions.push([randomMission, letters.pop()]);
  }
  return fourMissions;
}

export { selectFourMissions };
