const messageStorage = {
    // Save a message to localStorage
    saveMessage: (message) => {
      // Get the existing messages array from localStorage or create a new one
      const existingMessages = JSON.parse(localStorage.getItem("messages")) || [];
  
      // Add the new message to the array
      existingMessages.push(message);
  
      // Save the updated messages array to localStorage
      localStorage.setItem("messages", JSON.stringify(existingMessages));
    },
  
    // Retrieve all messages from localStorage
    getAllMessages: () => {
      // Get the messages array from localStorage
      const messages = JSON.parse(localStorage.getItem("messages"));
  
      // Return the messages array or an empty array if it doesn't exist yet
      return messages || [];
    }
  };
  