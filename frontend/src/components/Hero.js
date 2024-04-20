"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FAQs } from "@/utils/constants";
import MessageList from "./MessageList";
import FAQButtons from "./Faq";
import FAQAccordion from "./FAQAccordion";
const Hero = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);
    setIsTyping(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`,
        { message },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "chatbot", text: res.data.response },
      ]);
      setIsTyping(false);
      setMessage("");
    } catch (err) {
      console.error(err);
      setIsTyping(false);
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
      <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
          <img src={logo} alt="sumz_logo" className="w-28 object-contain" />

          <button
            type="button"
            onClick={() =>
              window.open("https://github.com/j3pathak7/summarease", "_blank")
            }
            className="black_btn"
          >
            GitHub
          </button>
        </nav>
        <h1 className="head_text">
          Government Policy Guide <br className="max-md:hidden" />
          <span className="orange_gradient ">OpenAI GPT-4</span>
        </h1>
        <h2 className="desc">
          Simplify your reading with Summize, an open-source article summarizer
          that transforms lengthy articles into clear and concise summaries
        </h2>
      </header>
      <div className="h-32 overflow-scroll m-4">
        <FAQAccordion faqs={FAQs} handleFAQClick={handleFAQClick} />
      </div>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full max-w-lg overflow-auto">
        <MessageList messages={messages} isTyping={isTyping} />
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex space-x-4 mt-4 w-full max-w-md"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default Hero;
