import React, { useState } from "react";

function Admin() {
  const [userId, setUserId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("photo", photo);
    formData.append("audio", audio);

    try {
      const response = await fetch("https://ybg-back.vercel.app/admin", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Admin;
