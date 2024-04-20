import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GovGuide - Your Friendly Government Policy Companion",
  description:
    "GovGuide simplifies government policies, making complex details easy to understand. Explore FAQs, receive personalized information, and gain insights into policy implications. Empower yourself with GovGuide today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
