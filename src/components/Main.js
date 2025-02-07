import React from "react";

function Main() {
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
        backgroundColor: "#f0f0f0",
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
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      ></iframe>
    </div>
  );
}

export default Main;
