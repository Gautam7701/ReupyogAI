"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message instantly
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }), // ✅ send full chat history
      });

      const data = await res.json();

      // ✅ Now reply is just a string
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("Chat API error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-16 left-16 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-16 right-16 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20 animate-pulse" />

      {/* Chat Widget */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden border border-green-100 flex flex-col"
      >
        {/* Header */}
        <header className="p-5 bg-gradient-to-r from-green-600 to-green-500 text-white shadow flex items-center justify-center gap-3">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
          >
            <Bot className="w-6 h-6 text-green-600" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-1">
              ReUpyog AI <Sparkles className="w-4 h-4" />
            </h1>
            <p className="text-xs opacity-90">
              Your AI guide for refurbished electronics ♻️
            </p>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 h-[520px] scrollbar-thin scrollbar-thumb-green-200">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 mt-24"
            >
              👋 Start chatting with{" "}
              <span className="text-green-600 font-semibold">ReUpyog AI</span>
              <br />
              Ask about refurbished electronics, buy-back options, and eco-friendly tips!
            </motion.div>
          )}
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-md leading-relaxed text-sm md:text-base ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-green-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-green-100 text-gray-600 px-4 py-2 rounded-2xl rounded-bl-none shadow inline-flex gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-300"></span>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="border-t p-3 bg-white/70 backdrop-blur-xl flex items-center gap-2 sticky bottom-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask ReUpyog AI about refurbished electronics..."
            className="flex-1 border border-gray-300 px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white/80 placeholder-gray-400 shadow-sm"
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition"
          >
            <Send size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
