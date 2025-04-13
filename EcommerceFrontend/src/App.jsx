import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import Chatbot from "./components/ChatBot";

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Chatbot />
      <Header />
      <main className="h-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
