"use client";

import { useState } from "react";

export default function ChatPage() {
  const [id, setId] = useState(0);
  const [chatHistory, setChatHistory] = useState<
    { id: string; message: string; role: "user" | "assistant" }[]
  >([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim() === "") return;
    setIsLoading(true);
    setMessage("");
    fetch("http://localhost:3000/api/chat")
      .then(async (response) => {
        setIsLoading(false);
        const outputText = await response.json();
        setChatHistory([
          ...chatHistory,
          { id: String(id), message, role: "user" },
          { id: String(id + 1), message: outputText, role: "assistant" },
        ]);
        setId((id) => (id += 2));
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Chat with Open AI
        </h1>
        <div className="flex flex-col gap-4 mb-4 max-h-80 overflow-y-auto pr-2">
          {chatHistory.map((chat) =>
            chat.role === "user" ? (
              <div key={chat.id} className="flex justify-end">
                <div className="flex flex-col">
                  <div className="bg-black text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-xs break-words shadow-md">
                    {chat.role}
                  </div>
                  <div className="bg-black text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-xs break-words shadow-md">
                    {chat.message}
                  </div>
                </div>
              </div>
            ) : (
              <div key={chat.id} className="flex justify-start">
                <div className="flex flex-col">
                  <div className="bg-black text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-xs break-words shadow-md">
                    {chat.role}
                  </div>
                  <div className="bg-black text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-xs break-words shadow-md">
                    {chat.message}
                  </div>
                </div>
              </div>
            )
          )}
          {isLoading && (
            <div className="bg-black text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-xs break-words shadow-md">
              Loading...
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 hover:text-black"
              aria-label="Clear input"
              onClick={() => setMessage("")}
            >
              ✕
            </button>
          </div>
          <button
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
