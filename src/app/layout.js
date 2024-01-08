import { Inter } from "next/font/google";
import "./globals.css";
// import NavNar from "./dashboard/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pro Invest",
  description: "Invierte Con Pro Invest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* <NavNar /> */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
