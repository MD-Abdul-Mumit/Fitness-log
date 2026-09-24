import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { ToastContainer } from "react-toastify";
import React from "react";

export const metadata: Metadata = {
  title: "FitLog — Workout Library & Routine Planner",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-white font-sans antialiased selection:bg-[#ccff00] selection:text-black">
        <WorkoutProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            theme="dark"
            toastClassName="bg-[#1c1c1c] text-white border border-white/10 rounded-xl text-xs font-bold"
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}
