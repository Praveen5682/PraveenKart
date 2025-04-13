// src/Chatbot.js
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io"; // Example using React Icons for Close icon

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // State to handle chatbot visibility

  // Function to send the message to the Rasa server
  const sendMessageToRasa = async (message) => {
    const response = await fetch(
      "http://localhost:5005/webhooks/rest/webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      }
    );

    const data = await response.json();
    return data;
  };

  // Handle user input and send it to Rasa
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userMessage },
    ]);

    // Send user message to Rasa and get the response
    const rasaResponse = await sendMessageToRasa(userMessage);

    // Add Rasa's response to the chat
    if (rasaResponse) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: rasaResponse[0]?.text || "Sorry, I didn't understand that.",
        },
      ]);
    }

    // Clear input field
    setUserMessage("");
  };

  // Handle opening and closing the chat
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <>
      {/* Customer Support Icon */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 z-50"
      >
        <span className="text-3xl">💬</span>{" "}
        {/* You can replace this with an actual icon */}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-5 right-5 w-96 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="flex flex-col h-full">
            {/* Chat Header with Close Button */}
            <div className="flex justify-between items-center p-3 bg-blue-500 text-white rounded-t-lg">
              <span className="font-semibold">AI Assistant</span>
              <button
                onClick={toggleChat}
                className="text-white bg-transparent hover:bg-blue-600 rounded-full p-2"
              >
                <IoMdClose /> {/* Close Button */}
              </button>
            </div>

            {/* Chat Window */}
            <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50 rounded-b-lg max-h-80">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-white ${
                        msg.sender === "user" ? "bg-blue-500" : "bg-gray-700"
                      } shadow-md`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex items-center p-3 bg-gray-200 border-t border-gray-300 rounded-b-lg">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
