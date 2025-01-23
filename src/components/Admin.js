import React, { useState, useEffect, useRef } from "react";
import {
  Play as PlayIcon,
  Pause as PauseIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";

function Admin() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [audio, setAudio] = useState(null);
  const [error, setError] = useState("");
  const [playingAudio, setPlayingAudio] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const audioRefs = useRef({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://ybg-back.vercel.app/users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", userId);
    if (photo) formData.append("photo", photo);
    if (audio) formData.append("audio", audio);

    try {
      const response = await fetch("https://ybg-back.vercel.app/admin", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchUsers();
        setPhoto(null);
        setPhotoPreview(null);
        setAudio(null);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit files");
    }
  };

  const downloadFile = async (userId, fileType) => {
    try {
      const response = await fetch(
        `https://ybg-back.vercel.app/user/${userId}/${fileType}`
      );
      if (!response.ok) {
        throw new Error(`No ${fileType} found`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `user_${userId}_${fileType}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(`Error downloading ${fileType}:`, error);
      alert(`Failed to download ${fileType}`);
    }
  };

  const toggleAudio = (userId) => {
    const audioElement = audioRefs.current[userId];

    if (playingAudio === userId) {
      audioElement.pause();
      setPlayingAudio(null);
    } else {
      if (playingAudio && audioRefs.current[playingAudio]) {
        audioRefs.current[playingAudio].pause();
      }

      audioElement.play();
      setPlayingAudio(userId);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://ybg-back.vercel.app/edit/${editingUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingUser.name,
            surname: editingUser.surname,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchUsers();
        setEditingUser(null);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error editing user:", error);
      setError("Failed to edit user");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this contestant?"))
      return;

    try {
      const response = await fetch(
        `https://ybg-back.vercel.app/delete/${userId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchUsers();
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    }
  };

  return (
    <div className="bg-[#121212] text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-12 tracking-widest">
          SQUID GAME: ADMIN PANEL
        </h1>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[#1E1E1E] p-8 rounded-2xl shadow-2xl mb-12 grid grid-cols-2 gap-6"
        >
          <div className="col-span-2">
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg"
            >
              <option value="">Select Contestant</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} {user.surname} (#{user.player_number})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-4 text-gray-400">Contestant Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg"
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Photo Preview"
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block mb-4 text-gray-400">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudio(e.target.files[0])}
              className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg font-bold uppercase tracking-wide"
            >
              Submit Contestant Details
            </button>
          </div>
        </form>

        <div className="bg-[#1E1E1E] rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-red-500">
            Contestant List
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-[#2A2A2A] rounded-2xl p-6 transform transition-all hover:scale-105 relative"
              >
                {/* Edit Modal */}
                {editingUser && editingUser.id === user.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
                    <form
                      onSubmit={handleEditUser}
                      className="bg-[#1E1E1E] p-6 rounded-lg w-full max-w-sm"
                    >
                      <h3 className="text-xl font-bold mb-4 text-red-500">
                        Edit Contestant
                      </h3>
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            name: e.target.value,
                          })
                        }
                        placeholder="First Name"
                        className="w-full bg-[#2A2A2A] text-white p-2 rounded-lg mb-4"
                        required
                      />
                      <input
                        type="text"
                        value={editingUser.surname}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            surname: e.target.value,
                          })
                        }
                        placeholder="Last Name"
                        className="w-full bg-[#2A2A2A] text-white p-2 rounded-lg mb-4"
                        required
                      />
                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingUser(null)}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() =>
                      setEditingUser({
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                      })
                    }
                    className="bg-gray-700 hover:bg-gray-600 p-1 rounded-full"
                  >
                    <EditIcon size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-600 hover:bg-red-700 p-1 rounded-full"
                  >
                    <DeleteIcon size={16} />
                  </button>
                </div>

                
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mr-4 font-bold">
                    #{user.player_number}
                  </div>
                  <div>
                    <h3 className="font-bold">
                      {user.name} {user.surname}
                    </h3>
                  </div>
                </div>

                <div className="mb-4">
                  {user.has_photo ? (
                    <img
                      src={`https://ybg-back.vercel.app/user/${user.id}/photo`}
                      alt={`${user.name}'s photo`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                      No Photo
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  {user.has_photo && (
                    <button
                      onClick={() => downloadFile(user.id, "photo")}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"
                    >
                      <DownloadIcon size={20} />
                    </button>
                  )}

                  {user.has_audio && (
                    <>
                      <audio
                        ref={(el) => (audioRefs.current[user.id] = el)}
                        src={`https://ybg-back.vercel.app/user/${user.id}/audio`}
                        onEnded={() => setPlayingAudio(null)}
                      />
                      <button
                        onClick={() => toggleAudio(user.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                      >
                        {playingAudio === user.id ? (
                          <PauseIcon size={20} />
                        ) : (
                          <PlayIcon size={20} />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
