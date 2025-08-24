"use client";

import Image from "next/image";
import Link from "next/link";
import { Bot, Leaf, RefreshCcw} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 flex flex-col">
      
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-8 py-5 shadow-md bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/heroimagere.jpg" alt="ReUpyog AI Logo" width={80} height={80} />
          <span className="text-2xl font-extrabold text-green-700 tracking-tight">
            ReUpyog AI
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
            <Link href="#features" className="hover:text-green-700 transition">Features</Link>
            <Link href="#about" className="hover:text-green-700 transition">About</Link>
            <Link href="#contact" className="hover:text-green-700 transition">Contact</Link>
          </nav>

          {/* Recommendations Button */}
          {/* <Link
            href="/features/recommend"
            className="ml-4 px-5 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 shadow-md transition"
          >
            🌿 Eco Recommendations
          </Link> */}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-12">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-gray-800 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-green-600">ReUpyog AI</span> ♻️
        </motion.h1>
        
        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your AI-powered companion for buying, selling, and renewing 
          <span className="font-semibold text-green-700"> refurbished electronics </span> 
          and driving a <span className="font-semibold text-green-700">sustainable lifestyle</span>.
        </motion.p>

        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Link
            href="/chatbot"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 shadow-lg transition"
          >
            Try ReUpyog AI <Bot className="w-5 h-5" />
          </Link>
          <Link
            href="#features"
            className="px-6 py-3 rounded-full border border-green-600 text-green-700 font-medium hover:bg-green-50 transition"
          >
            Learn More
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 relative w-full max-w-4xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/hero.jpeg"
            alt="ReUpyog AI Illustration"
            width={1200}
            height={600}
            className="rounded-2xl shadow-2xl"
            priority
          />
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-14">
            Why Choose <span className="text-green-600">ReUpyog AI</span>?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <motion.div
              className="p-6 rounded-xl shadow-md bg-green-50 hover:shadow-lg hover:-translate-y-2 transition transform"
              whileHover={{ scale: 1.05 }}
            >
              <Bot className="w-10 h-10 text-green-700 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-green-700 mb-3">AI-Powered Chat</h3>
              <p className="text-gray-600">
                Get instant answers about refurbished products, buy-back programs, and repair services.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="p-6 rounded-xl shadow-md bg-green-50 hover:shadow-lg hover:-translate-y-2 transition transform"
              whileHover={{ scale: 1.05 }}
            >
              <Leaf className="w-10 h-10 text-green-700 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-green-700 mb-3">Eco Recommendations</h3>
              <p className="text-gray-600">
                Get personalized suggestions to buy, sell, and recycle electronics sustainably.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="p-6 rounded-xl shadow-md bg-green-50 hover:shadow-lg hover:-translate-y-2 transition transform"
              whileHover={{ scale: 1.05 }}
            >
              <RefreshCcw className="w-10 h-10 text-green-700 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-green-700 mb-3">Circular Lifestyle</h3>
              <p className="text-gray-600">
                Be a part of the circular economy and contribute towards reducing e-waste.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-green-600 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} ReUpyog AI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://linkedin.com" target="_blank" className="hover:underline">LinkedIn</a>
            <a href="https://github.com" target="_blank" className="hover:underline">GitHub</a>
            <a href="mailto:contact@reupyog.in" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <Link
        href="/chatbot"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white shadow-xl p-4 rounded-full transition"
      >
        <Bot className="w-6 h-6" />
      </Link>
    </div>
  );
}
