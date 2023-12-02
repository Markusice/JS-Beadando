function showEndOfGameMsg() {
  const container = document.querySelector("#container");

  const wrapper = document.createElement("div");
  wrapper.classList.add("end-game-wrapper");

  const endOfGame = document.createElement("div");
  endOfGame.classList.add("end-of-game");
  endOfGame.innerText = "Vége a játéknak";
  endOfGame.style.animation = wrapper.style.animation =
    "0.4s ease 0s 1 normal forwards running addEndGameMsg";

  const showGameBtn = document.createElement("button");
  showGameBtn.innerText = "Megtekintés";
  showGameBtn.classList.add("show-game-btn");
  showGameBtn.style.animation = wrapper.style.animation =
    "0.4s ease 0s 1 normal forwards running addEndGameMsg";

  showGameBtn.addEventListener("click", () => wrapper.remove());

  wrapper.appendChild(endOfGame);
  wrapper.appendChild(showGameBtn);
  wrapper.classList.add("dark:text-white");

  container.appendChild(wrapper);
  wrapper.style.animation =
    "0.4s ease-in 0s 1 normal forwards running showEndGame";
}

export { showEndOfGameMsg };
