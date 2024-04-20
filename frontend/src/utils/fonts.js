// fonts.js
import { Satoshi } from "@next/font/google";

export const satoshi = Satoshi({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-satoshi",
});
