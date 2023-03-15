// Get the profile input fields and save button
const profileForm = document.getElementById("profile-form");
const nameInput = document.getElementById("name-input");
const bioInput = document.getElementById("bio-input");
const saveButton = document.getElementById("save-button");

// Set the initial profile values
let profile = {
  name: "",
  bio: "",
};

// Load the profile from local storage
if (localStorage.getItem("profile")) {
  profile = JSON.parse(localStorage.getItem("profile"));
  nameInput.value = profile.name;
  bioInput.value = profile.bio;
}

// Function to save the profile to local storage
function saveProfile() {
  profile.name = nameInput.value;
  profile.bio = bioInput.value;
  localStorage.setItem("profile", JSON.stringify(profile));
}

// Add event listener to the save button
saveButton.addEventListener("click", () => {
  saveProfile();
});

// Add event listener to the profile form to handle pressing enter
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveProfile();
});
