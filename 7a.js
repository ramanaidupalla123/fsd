import React, { useState } from "react";

function App() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ fontFamily: "system-ui", padding: 20 }}>
      <h2>React Conditional Rendering</h2>

      {show ? (
        <p>Hello, welcome to React! 👋</p>
      ) : (
        <p>Goodbye! 👋</p>
      )}

      <button onClick={() => setShow(!show)}>
        {show ? "Hide Message" : "Show Message"}
      </button>
    </div>
  );
}

export default App;


npx create-react-app myreactapp
cd myreactapp
npm start
