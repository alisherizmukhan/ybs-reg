import React from 'react';

const Agreement = ({ onClose }) => {
  return (
    <div className="bg-gray-900 p-8 rounded-lg border-2 border-pink-600 max-w-2xl max-h-[80vh] overflow-y-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl text-pink-600 font-bold mb-2">FINAL AGREEMENT</h2>
        <h3 className="text-xl text-pink-400">[PLAYER'S CONTRACT]</h3>
      </div>

      <div className="space-y-6 text-white">
        <div className="text-center text-yellow-500 font-bold mb-8">
          ⚠ WARNING: READ CAREFULLY BEFORE PROCEEDING ⚠
        </div>

        <p className="text-gray-300 italic">
          In entering YOUR BEST GAME, you acknowledge that once you sign this contract, there is no turning back. 
          Your signature marks your commitment, your destiny, and perhaps... your fate.
        </p>

        <section className="space-y-4">
          <h3 className="text-xl text-pink-500 font-bold">§1. THE NATURE OF THE GAME</h3>
          <p>You are not here by accident. You have been chosen. March 8th is not just a date - it is your opportunity to prove your worth in a game that will test the very limits of your being.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl text-pink-500 font-bold">§2. THE POINT OF NO RETURN</h3>
          <div className="space-y-2 pl-4">
            <p>2.1. Upon entering your name, you cease to be merely a person. You become a PLAYER.</p>
            <p>2.2. Each PLAYER receives a unique number. This number is now your identity.</p>
            <p>2.3. There is no exit until either:</p>
            <ul className="list-none pl-8 space-y-1">
              <li>- Victory is achieved</li>
              <li>- Elimination occurs</li>
              <li>- The final challenge concludes</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl text-pink-500 font-bold">§3. THE RULES OF SURVIVAL</h3>
          <div className="space-y-2 pl-4">
            <p>3.1. Every PLAYER starts equal. Your past means nothing here.</p>
            <p>3.2. Trust is a weapon - it can save you or destroy you.</p>
            <p>3.3. Alliances are permitted but remember: only one can emerge victorious.</p>
            <p>3.4. Deception will be punished. Violators will face immediate and permanent elimination.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl text-pink-500 font-bold">§4. THE TRIALS</h3>
          <p>You will face challenges that will:</p>
          <ul className="list-none pl-8 space-y-1">
            <li>- Break your limits</li>
            <li>- Test your resolve</li>
            <li>- Challenge your perceptions</li>
            <li>- Reveal your true nature</li>
          </ul>
          <p>Each challenge has two outcomes:</p>
          <div className="pl-8 font-bold">
            <p>SUCCESS = Advancement</p>
            <p>FAILURE = Elimination</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl text-pink-500 font-bold">§5. THE PRIZE</h3>
          <div className="space-y-2 pl-4">
            <p>5.1. The ultimate victor will claim:</p>
            <ul className="list-none pl-8 space-y-1">
              <li>- The Crown of Victory</li>
              <li>- The Grand Prize</li>
              <li>- The Title: "Supreme Champion 2025"</li>
            </ul>
            <p>5.2. But remember: the greatest prize is proving your worth.</p>
          </div>
        </section>

        <div className="text-center border-t-2 border-pink-600 pt-6 mt-8">
          <div className="text-yellow-500 font-bold text-xl mb-4">⚠ FINAL WARNING ⚠</div>
          <p className="text-gray-300 italic">
            "May fortune favor the fearless."
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-500 
                   transition-colors duration-300 transform hover:scale-105 active:scale-95"
        >
          Close Agreement
        </button>
      </div>
    </div>
  );
};

export default Agreement;