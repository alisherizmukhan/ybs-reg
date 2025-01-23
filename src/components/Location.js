import React from 'react';

const Location = ({ onClose, playerNumber }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 p-6 rounded-lg border-2 border-pink-600 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="text-center mb-6">
          <h2 className="text-3xl text-pink-600 font-bold mb-2">CONGRATULATIONS!</h2>
          <div className="text-xl text-pink-400 font-bold mb-1">
            YOU'RE IN THE GAME
          </div>
          <div className="text-lg text-yellow-500">
            {`Welcome, Player ${playerNumber}`}
          </div>
        </div>

        <div className="space-y-4 text-white">
          <div className="text-center bg-gray-800 p-4 rounded-lg border border-pink-500">
            <h3 className="text-xl text-pink-500 font-bold mb-3">EVENT DETAILS</h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-pink-400 font-bold">DATE</div>
                <div className="text-lg">March 8th, 2025</div>
              </div>

              <div className="space-y-1">
                <div className="text-pink-400 font-bold">TIME</div>
                <div className="text-lg">19:00</div>
              </div>

              <div className="space-y-1">
                <div className="text-pink-400 font-bold">LOCATION</div>
                <div className="text-lg">BALLROOM RIGHT</div>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-300 italic text-sm">
            <p>
              A confirmation email with detailed instructions will be sent to
              you shortly.
            </p>
            <p className="mt-1">
              Remember: punctuality is crucial. Late arrivals will be
              eliminated.
            </p>
          </div>

          <div className="text-center text-yellow-500 font-bold text-sm">
            ⚠ BRING THIS CONFIRMATION WITH YOU ⚠
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 
                     transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            I'M READY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Location;
