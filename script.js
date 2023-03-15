// Get the message input field, send button and messages div
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messagesDiv = document.getElementById("chat");

// Set the username
let username = getUsername();

// Add event listener to the send button
sendButton.addEventListener("click", sendMessage);

// Add event listener to the message input field for "keydown" event
messageInput.addEventListener("keydown", (event) => {
  // If the Enter key is pressed
  if (event.keyCode === 13) {
    // Prevent the default behavior of the Enter key (submitting the form)
    event.preventDefault();

    // Send the message
    sendMessage();
  }
});

// Function to get the username from the user
function getUsername() {
  const storedUsername = localStorage.getItem("username");

  // If a username is already stored, use it
  if (storedUsername) {
    return storedUsername;
  }

  // Otherwise, prompt the user for a username and store it
  const username = prompt("Please enter your username:");

  localStorage.setItem("username", username);

  return username;
}

// Function to add a message to the chat
function addMessage(author, message, timestamp, isLocalUser) {
  // Create the message element
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  // Create the username element
  const usernameSpan = document.createElement("span");
  usernameSpan.classList.add("username");
  usernameSpan.innerText = author;
  usernameSpan.style.fontWeight = "bold";

  // Create the timestamp element
  const timestampSpan = document.createElement("span");
  timestampSpan.classList.add("timestamp");

  const dateOptions = { month: "short", day: "numeric" };
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  const now = new Date();
  const messageDate = new Date(timestamp);

  let dateString = messageDate.toLocaleDateString(undefined, dateOptions);
  if (now.toDateString() !== messageDate.toDateString()) {
    dateString += ` ${messageDate.getFullYear()}`;
  }

  const timeString = messageDate.toLocaleTimeString(undefined, timeOptions);

  timestampSpan.innerText = `${dateString} at ${timeString}`;
  timestampSpan.style.fontSize = "0.8em";
  timestampSpan.style.color = "#888";

  // Create the message content element
  const messageContent = document.createElement("span");
  messageContent.classList.add("message-content");
  messageContent.innerText = message;

  // Add the elements to the message div
  messageDiv.appendChild(usernameSpan);
  messageDiv.appendChild(document.createTextNode(" "));
  messageDiv.appendChild(timestampSpan);
  messageDiv.appendChild(document.createElement("br"));
  messageDiv.appendChild(messageContent);

  // If the message was sent by the local user, add a class to the message div
  if (isLocalUser) {
    messageDiv.classList.add("local-user-message");
  }

  // Add the message div to the messages div
  messagesDiv.appendChild(messageDiv);

  // Scroll to the bottom of the messages div
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


// Function to send a message
function sendMessage() {
  // Get the message from the input field
  const message = messageInput.value.trim();

  // If the message is empty, don't send it
  if (!message) {
    return;
  }

  // Add the message to the chat
  addMessage(username, message, Date.now());

  // Clear the input field
  messageInput.value = "";
}
function loadMessages() {
  // Get the saved messages
  let savedMessages = localStorage.getItem("chatMessages");

  // If there are no saved messages, return
  if (!savedMessages) {
    return;
  }

  // Otherwise, parse the saved messages into an array
  savedMessages = JSON.parse(savedMessages);

  // Loop through the saved messages and add them to the chat
  for (const savedMessage of savedMessages) {
    const { author, message, timestamp } = savedMessage;
    const isLocalUser = author === username;
    addMessage(author, message, timestamp, isLocalUser);
  }
}


function saveMessage(author, message, timestamp) {
  // Get the saved messages
  let savedMessages = localStorage.getItem("chatMessages");

  // If there are no saved messages, create an empty array
  if (!savedMessages) {
    savedMessages = [];
  } else {
    // Otherwise, parse the saved messages into an array
    savedMessages = JSON.parse(savedMessages);
  }

  // Add the new message to the array of saved messages
  savedMessages.push({ author: author, message: message, timestamp: timestamp });

  // Save the updated array of messages back to localStorage
  localStorage.setItem("chatMessages", JSON.stringify(savedMessages));
}
// Call the loadMessages function when the page is loaded
window.addEventListener("load", loadMessages);