import React, { useEffect, useState } from "react";

function Elimination() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://ybg-back.vercel.app/elimination");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Elimination</h1>
      <div>
        {users.map((user) => (
          <div key={user.id} style={{ marginBottom: "20px" }}>
            <h3>
              {user.name} {user.surname}
            </h3>
            {user.photo && <img src={`data:image/jpeg;base64,${user.photo}`} alt="User" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Elimination;
