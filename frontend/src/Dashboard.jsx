import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Dashboard() {
  

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Logged in 
      </button>
    </div>
  );
}

export default Dashboard;
