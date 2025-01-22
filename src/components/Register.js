import React, { useState } from 'react';
import Agreement from './Agreement';
import '../fonts.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgreed) {
      alert("You must agree to the terms first.");
      return;
    }
    setIsLoading(true);
    
    try {
      const response = await fetch("https://ybg-back.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-squid relative">
      {/* Decorative circles */}
      <div className="absolute top-8 left-8">
        <div className="w-16 h-16 border-4 border-pink-600 rounded-full opacity-50 animate-pulse" />
      </div>
      <div className="absolute bottom-8 right-8">
        <div className="w-16 h-16 border-4 border-pink-600 transform rotate-45 opacity-50 animate-pulse" />
      </div>
      
      <div className="w-full max-w-md animate-fadeIn">
        <h1 className="text-5xl md:text-6xl text-center mb-12 text-pink-600 font-bold tracking-wider">
          YOUR BEST GAME
        </h1>

        <form 
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-900 p-8 rounded-lg border-2 border-pink-600"
        >
          <div className="space-y-4">
            <div className="relative group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-pink-600 rounded-lg 
                         focus:outline-none focus:border-pink-400 transition-colors duration-300
                         transform hover:scale-[1.02] focus:scale-[1.02]"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="relative group">
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-pink-600 rounded-lg 
                         focus:outline-none focus:border-pink-400 transition-colors duration-300
                         transform hover:scale-[1.02] focus:scale-[1.02]"
                placeholder="Enter your surname"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-white">
            <input
              type="checkbox"
              id="agreement"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="w-4 h-4 border-pink-600 rounded focus:ring-pink-500"
            />
            <label htmlFor="agreement" className="text-sm">
              By clicking on the checkmark, you agree to the{" "}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-pink-600 underline hover:text-pink-400"
              >
                user agreement
              </button>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isAgreed}
            className={`w-full py-4 rounded-lg text-xl font-bold text-white 
              ${isLoading || !isAgreed ? 'bg-pink-800 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-500'} 
              transition-all duration-300 transform hover:scale-105 active:scale-95`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"/>
              </div>
            ) : (
              'ENTER THE GAME'
            )}
          </button>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Agreement onClose={() => setIsModalOpen(false)} />
        </div>
      )}

      <style jsx>{`
        @font-face {
          font-family: 'SquidGameFont';
          src: url('/fonts/SquidGameFont.ttf') format('truetype');
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .font-squid {
          font-family: 'SquidGameFont', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Register;