import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'; // Importing socket.io-client library
import "./MYCSS.css"; // Importing your custom CSS file

// Establishing a socket connection to the server
const socket = io('http://localhost:3001');

function App() {
  // State variables to manage messages and input field value
  const [messages, setMessages] = useState([]); // Array to store messages
  const [messageInput, setMessageInput] = useState(''); // Input field value

  // useEffect hook to handle side effects (e.g., listening for socket events)
  useEffect(() => {
    // Listening for 'chat message' events from the server
    socket.on('chat message', (message) => {
      // Adding the received message to the messages array
      setMessages([...messages, { text: message, fromBot: true }]);
    });

    // Cleanup function to remove event listener when component unmounts
    return () => {
      socket.off('chat message'); // Removing the 'chat message' event listener
    };
  }, [messages]); // Dependency array to ensure useEffect runs only when messages change

  // Function to handle form submission (sending messages)
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    if (messageInput.trim() !== '') {
      // Adding the user's message to the messages array
      setMessages([...messages, { text: messageInput, fromBot: false }]);
      // Emitting the message to the server
      socket.emit('chat message', messageInput);
      // Clearing the input field after sending the message
      setMessageInput('');
    }
  };
  // JSX structure for the component
  return (
    <div>
      <h1>Insta7ram</h1> {/* Heading */}
      <div className="chat-container"> {/* Container for displaying messages */}
        {/* Mapping through the messages array to render each message */}
        {messages.map((message, index) => (
          <div key={index} id='yes' className={message.fromBot ? 'bot-message' : 'user-message'}>
            {message.text} {/* Displaying the message text */}
          </div>
        ))}
      </div>
      {/* Form for typing and sending messages */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..." // Placeholder text for input field
        />
        <button type="submit">Send</button> {/* Button to submit the message */}
      </form>
    </div>
  );
}

export default App; // Exporting the component
