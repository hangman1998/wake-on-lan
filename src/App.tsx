import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [mac, setMac] = useState("");

  return (
    <div className="container">
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          invoke("send_magic_packet", { macAddress: mac })
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setMac(e.currentTarget.value)}
          placeholder="Enter a Mac Address ..."
        />
        <button type="submit">Wake Up</button>
      </form>

    </div>
  );
}

export default App;
