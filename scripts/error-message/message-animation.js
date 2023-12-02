import { createMessageDiv } from "./create-message.js";

/**
 *
 * @param msg {string}
 */
function runMessageAnimation(msg) {
  const messageWrapper = createMessageDiv(msg);

  messageWrapper.style.animation =
    "0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running showMessage";

  function hideMessage() {
    messageWrapper.style.animation =
      "0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal both running hideMessage";
  }

  setTimeout(hideMessage, 3000);
  setTimeout(() => messageWrapper.remove(), 4000);
}

export { runMessageAnimation };
