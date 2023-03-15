// Get the sign-up form
const signupForm = document.getElementById("signup-form");

// Add event listener to form submission
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the username and password from the form
  const username = signupForm.elements.username.value;
  const password = signupForm.elements.password.value;

  // Validate the form data
  if (!username || !password) {
    alert("Please enter a username and password.");
    return;
  }

  // Store the user's information locally
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  // Redirect the user to the chat page
  window.location.href = "Main.html";
});
