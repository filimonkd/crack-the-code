import { useState } from "react";
import React, { useEffect } from "react";
import "./App.css";

function App() {
  const handleLogin = () => {
    const url = `https://oauth.telegram.org/auth?bot_id=${import.meta.env.VITE_ID}&origin=${window.location.origin}&embed=0`;
    window.open(url, "_blank", "width=500,height=500");
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Login with Telegram
        </button>
      </div>
    </>
  );
}

export default App;
