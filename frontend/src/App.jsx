import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="text-3xl italic ...">The quick brown fox ...</p>
      <p className="not-italic ...">The quick brown fox ...</p>
    </>
  );
}

export default App;
