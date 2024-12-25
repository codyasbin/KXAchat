"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs"; // Import the Clerk hook

export default function ChatPage() {
  const { isSignedIn } = useAuth(); // Get authentication status
  const [messages, setMessages] = useState<{ senderId: string; message: string }[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect if the user is not signed in
  useEffect(() => {
    if (!isSignedIn) {
      window.location.href = "/"; // Redirect to homepage
    }
  }, [isSignedIn]);

  useEffect(() => {
    const ws = new WebSocket("wss://kxasever.onrender.com");
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "system") {
        setCurrentUserId(data.message.split("Your ID is ")[1]); // Extract client ID
      } else {
        setMessages((prev) => [...prev, data]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (socket?.readyState === WebSocket.OPEN && currentUserId) {
      const messageData = { senderId: currentUserId, message: input };

      // Update local state with the new message
      setMessages((prev) => [...prev, messageData]);

      // Send the message over WebSocket
      socket.send(JSON.stringify(messageData));
      setInput(""); // Clear input field
    } else {
      console.error("WebSocket is not open or currentUserId is null.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.trim() !== "") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cream">
      {/* Header */}
      <div className="py-4 px-6 flex flex-row justify-between bg-gradient-to-r from-purple-400 to-indigo-500 shadow-md text-white">
        <h1 className="text-xl font-semibold">KXA Chat</h1>
        <h3 className="text-sm font-thin">made with 🤍 by asbin</h3>
      </div>

      {/* Messages Section */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-[75%]">
              <div
                className={`text-xs text-gray-500 mb-1 ${
                  msg.senderId === currentUserId ? "text-right" : "text-left"
                }`}
              >
                {msg.senderId === currentUserId ? "You" : `ID: ${msg.senderId}`}
              </div>
              <div
                className={`rounded-xl p-3 text-sm break-words shadow-md ${
                  msg.senderId === currentUserId
                    ? "bg-gradient-to-r from-purple-400 to-indigo-500 text-white"
                    : "bg-lavender text-gray-800"
                }`}
              >
                {msg.message}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="bg-white p-4 flex items-center shadow-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger on Enter key press
          placeholder="Type your message..."
          className="flex-grow p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={sendMessage}
          className="ml-4 px-6 py-3 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white hover:from-purple-500 hover:to-indigo-600 shadow-lg focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}
