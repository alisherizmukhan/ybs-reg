import React from "react";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "0",
        backgroundColor: "#f0f0f0", // Optional: Background color for UI
      }}
    >
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/UfpQNjan8Qc?autoplay=1&mute=1&si=Y9N0LOavhgkeUwvY"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          borderRadius: "10px", // Optional: Rounded corners for better UI
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional: Shadow effect for better UI
        }}
      ></iframe>
    </div>
  );
}

export default App;
