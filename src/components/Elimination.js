import React, { useEffect, useState, useRef } from "react";
import sound from "../sound.MP3";

function Elimination() {
  const [users, setUsers] = useState([]);
  const audioRefs = useRef({});
  const [eliminatedUsers, setEliminatedUsers] = useState({});
  const commonSoundRef = useRef(null); // Reference for the common sound
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screenWidth dynamically
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    if (!eliminatedUsers[user.id] && commonSoundRef.current) {
      commonSoundRef.current.currentTime = 0; // Reset to the start of the sound
      commonSoundRef.current.play();
    }

    // Play user-specific audio 1 second after the common sound
    const userAudioElement = audioRefs.current[user.id];
    if (userAudioElement) {
      setTimeout(() => {
        if (!eliminatedUsers[user.id]) {
          userAudioElement.currentTime = 0; // Reset to the start
          userAudioElement.play().catch((error) => {
            console.error("Error playing user-specific audio:", error);
          });
        }
      }, 1000); // 1-second delay
    }
  };

  const renderDiamondGrid = () => {
    const sortedUsers = [...users].sort(
      (a, b) => a.player_number - b.player_number
    );

    // Dynamically calculate how many diamonds fit in a row
    const diamondSize = 7 * 16; // Convert 7rem to pixels
    const rowCapacity = Math.floor(screenWidth / (diamondSize + 16)); // Adding 16px for spacing
    const rows = [];
    let toggle = true; // Alternate between even and odd rows
    let index = 0;

    while (index < sortedUsers.length) {
      const rowCount = toggle ? rowCapacity : rowCapacity - 1; // Alternate row lengths
      const rowUsers = sortedUsers.slice(index, index + rowCount);
      rows.push(rowUsers);
      index += rowCount;
      toggle = !toggle;
    }

    return (
      <div className="grid-container">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`row ${rowIndex % 2 === 0 ? "even-row" : "odd-row"}`}
          >
            {row.map((user) => (
              <div
                key={user.id}
                className={`diamond ${
                  eliminatedUsers[user.id] ? "eliminated" : ""
                }`}
                onClick={() => toggleElimination(user)}
              >
                <img
                  src={`https://ybg-back.vercel.app/user/${user.id}/photo`}
                  alt={`Player ${user.player_number}`}
                  className="diamond-image"
                />
                <div className="player-number">
                  {String(user.player_number).padStart(3, "0")}
                </div>
                {user.audio && (
                  <audio
                    ref={(el) => (audioRefs.current[user.id] = el)}
                    src={`https://ybg-back.vercel.app/user/${user.id}/audio`}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <h1 className="text-4xl text-red-500 text-center mb-8 uppercase tracking-widest font-squid">
        Elimination Board
      </h1>
      {renderDiamondGrid()}
      {/* Add the common sound element */}
      <audio ref={commonSoundRef} src={sound} />
      <style jsx>{`
        .grid-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: -2rem; /* Negative gap to pull rows closer */
          padding: 3rem;

        .row {
          display: flex;
          justify-content: center;
          gap: 0.5rem
        }

        .odd-row {
          gap: 0.5rem
        }

        .diamond {
          margin-top: -3rem;
          width: 7rem;
          height: 7rem;
          clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
          background: rgba(255, 20, 147, 0.3); /* Pink background effect */
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .diamond:hover {
          transform: scale(1.05);
          filter: brightness(1.2);
        }

        .diamond.eliminated {
          opacity: 0.15;
          filter: grayscale(100%);
        }

        .diamond-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
          filter: contrast(1.2) brightness(0.8); /* TV effect */
        }

        .player-number {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.8rem;
          color: #00ff00; /* Green digital text */
          text-shadow: 0 0 8px rgba(0, 255, 0, 0.8),
            0 0 12px rgba(0, 255, 0, 0.6); /* Glow effect */
          font-family: "Digital";
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default Elimination;
