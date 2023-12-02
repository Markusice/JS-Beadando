/**
 *
 * @param msg {string}
 */
function createMessageDiv(msg) {
  let existingMessageWrapper;
  if ((existingMessageWrapper = document.querySelector(".message-wrapper"))) {
    existingMessageWrapper.remove();
  }

  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("message-wrapper");

  const message = document.createElement("div");
  message.classList.add("message");
  message.innerText = msg;

  messageWrapper.appendChild(message);
  document.body.appendChild(messageWrapper);

  return messageWrapper;
}

export { createMessageDiv };
