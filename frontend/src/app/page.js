import ChatBot from "@/components/ChatBot";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        {/* <Hero /> */}
        <ChatBot />
      </div>
    </main>
  );
}
