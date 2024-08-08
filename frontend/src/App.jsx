import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const handleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/telegram`;
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
