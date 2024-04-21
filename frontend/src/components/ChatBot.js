"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FAQs } from "@/utils/constants";
import MessageList from "./MessageList";
import { FaExclamationTriangle } from "react-icons/fa";

import FAQPopup from "./FAQAccordion";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const messagesEndRef = useRef(null);
  const [serverStatus, setServerStatus] = useState("Connecting to server");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/start`)
      .then((res) => {
        setMessages([
          ...messages,
          { sender: "chatbot", text: res.data.response },
        ]);
        setServerStatus(""); // Set serverStatus to an empty string on successful connection
      })
      .catch((err) => {
        console.error(err);
        setServerStatus("Error connecting to server"); // Update server status on error
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);
    setIsTyping(true);

    try {
      const interval = setInterval(() => {
        setDotCount((prevDotCount) => (prevDotCount + 1) % 3);
      }, 300);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`,
        { message },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      clearInterval(interval);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "chatbot", text: res.data.response },
      ]);
      setIsTyping(false);
      setMessage("");
      setDotCount(0);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setDotCount(0);
    }
  };

  const handleFAQClick = (faq) => {
    setMessage(faq);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: faq },
    ]);
    setIsTyping(true);
    const faqMessage = { message: faq };
    const encodedMessage = new URLSearchParams(faqMessage).toString();
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`, encodedMessage, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "chatbot", text: res.data.response },
        ]);
        setIsTyping(false);
        setMessage("");
      })
      .catch((err) => {
        console.error(err);
        setIsTyping(false);
      });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <nav className="flex justify-end items-center w-full md:mt-10 pt-3">
        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/j3pathak7/permissionless", "_blank")
          }
          className="black_btn"
        >
          GitHub
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center min-h-screen px-2 py-8 md:px-8">
        <h1 className="head_text m-2 md:m-8">
          Empowering Citizens Through
          <br className="max-md:hidden" />
          <span className="orange_gradient "> Policy Education</span>
        </h1>
        <h2 className="desc">
          Unlocking the Power of Knowledge to Navigate Government Policies
        </h2>
        <div className="m-4">
          <FAQPopup faqs={FAQs} handleFAQClick={handleFAQClick} />
        </div>
        <div className="w-full summary_box max-w-lg max-h-96 overflow-scroll">
          <MessageList
            messages={messages}
            isTyping={isTyping}
            dotCount={dotCount}
          />
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex mt-4 w-full max-w-lg relative justify-center items-center"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your query..."
            className="url_input peer"
          />
          <button type="submit" className="submit_btn">
            <p>↵</p>
          </button>
        </form>
        <p
          className={
            serverStatus === "Error connecting to server"
              ? "text-red-500 font-bold mt-4 flex items-center"
              : serverStatus === "Connecting to server"
              ? "text-cyan-500 mt-4 flex items-center"
              : "hidden"
          }
        >
          {serverStatus === "Error connecting to server" && (
            <FaExclamationTriangle className="inline-block mr-2" />
          )}
          {serverStatus}
          {serverStatus === "Error connecting to server" && (
            <button
              className="cancel_btn ml-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          )}
        </p>
      </div>
    </>
  );
};

export default ChatBox;
