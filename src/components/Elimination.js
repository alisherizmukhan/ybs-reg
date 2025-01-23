import React, { useEffect, useState, useRef } from "react";

function Elimination() {
  const [users, setUsers] = useState([]);
  const audioRefs = useRef({});
  const [eliminatedUsers, setEliminatedUsers] = useState({});

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

  const toggleElimination = (user) => {
    setEliminatedUsers((prev) => ({
      ...prev,
      [user.id]: !prev[user.id],
    }));

    // Audio handling
    const audioElement = audioRefs.current[user.id];
    if (audioElement) {
      if (!eliminatedUsers[user.id]) {
        audioElement.play();
      } else {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    }
  };

  const renderDiamondGrid = () => {
    const sortedUsers = [...users].sort((a, b) => a.player_number - b.player_number);

    return (
      <div className="relative w-full h-[80vh] flex items-center justify-center">
        {sortedUsers.map((user, index) => (
          <div
            key={user.id}
            className={`absolute transform rotate-45 w-32 h-32 bg-cover bg-center cursor-pointer transition-all duration-300 ease-in-out`}
            style={{
              backgroundImage: user.photo
                ? `url(https://ybg-back.vercel.app/user/${user.id}/photo)`
                : 'none',
              backgroundSize: 'cover',
              opacity: eliminatedUsers[user.id] ? 0.5 : 1,
              transform: 'rotate(45deg)',
              top: calculatePosition(user.player_number, sortedUsers.length).top,
              left: calculatePosition(user.player_number, sortedUsers.length).left,
            }}
            onClick={() => toggleElimination(user)}
          >
            {user.audio && (
              <audio
                ref={(el) => (audioRefs.current[user.id] = el)}
                src={`https://ybg-back.vercel.app/user/${user.id}/audio`}
              />
            )}
            <div className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center">
              {user.player_number}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const calculatePosition = (playerNumber, total) => {
    const radius = 300;
    const angle = (Math.PI * 2 * (playerNumber - 1)) / total - Math.PI / 2;
    return {
      top: `calc(50% + ${radius * Math.sin(angle)}px - 64px)`,
      left: `calc(50% + ${radius * Math.cos(angle)}px - 64px)`,
    };
  };

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <h1 className="text-4xl text-red-500 text-center mb-8 uppercase tracking-widest">
        Elimination Board
      </h1>
      {renderDiamondGrid()}
    </div>
  );
}

export default Elimination;