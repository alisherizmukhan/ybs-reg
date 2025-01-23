import React from 'react';

const Agreement = ({ onClose }) => {
  return (
    <div className="bg-gray-900 p-8 rounded-lg border-2 border-pink-600 max-w-2xl max-h-[80vh] overflow-y-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl text-pink-600 font-bold mb-2 font-squid">FINAL AGREEMENT</h2>
        <h3 className="text-xl text-pink-400 font-squid">[PLAYER'S CONTRACT]</h3>
      </div>

      <div className="space-y-6 text-white">
        <div className="text-center text-yellow-500 font-bold mb-8 font-squid">
          ⚠ WARNING: READ CAREFULLY BEFORE PROCEEDING ⚠
        </div>

        <p className="text-gray-300 italic font-gilroy">
          In entering YOUR BEST GAME, you acknowledge that once you sign this contract, there is no turning back. 
          Your signature marks your commitment, your destiny, and perhaps... your fate.
        </p>

        <section className="space-y-4">
          <h3 className="text-xl text-pink-500 font-bold">§1. THE NATURE OF THE GAME</h3>
          <p className="font-gilroy">You are not here by accident. You have been chosen. March 8th is not just a date - it is your opportunity to prove your worth in a game that will test the very limits of your being.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl text-pink-500 font-bold">§2. THE POINT OF NO RETURN</h3>
          <div className="space-y-2 pl-4">
            <p className="font-gilroy">2.1. Upon entering your name, you cease to be merely a person. You become a PLAYER.</p>
            <p className="font-gilroy">2.2. Each PLAYER receives a unique number. This number is now your identity.</p>
            <p className="font-gilroy">2.3. There is no exit until either:</p>
            <ul className="list-none pl-8 space-y-1">
              <li className="font-gilroy">- Victory is achieved</li>
              <li className="font-gilroy">- Elimination occurs</li>
              <li className="font-gilroy">- The final challenge concludes</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl text-pink-500 font-bold">§3. THE RULES OF SURVIVAL</h3>
          <div className="space-y-2 pl-4">
            <p className="font-gilroy">3.1. Every PLAYER starts equal. Your past means nothing here.</p>
            <p className="font-gilroy">3.2. Trust is a weapon - it can save you or destroy you.</p>
            <p className="font-gilroy">3.3. Alliances are permitted but remember: only one can emerge victorious.</p>
            <p className="font-gilroy">3.4. Deception will be punished. Violators will face immediate and permanent elimination.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl text-pink-500 font-bold">§4. THE TRIALS</h3>
          <p className="font-gilroy">You will face challenges that will:</p>
          <ul className="list-none pl-8 space-y-1">
            <li className="font-gilroy">- Break your limits</li>
            <li className="font-gilroy">- Test your resolve</li>
            <li className="font-gilroy">- Challenge your perceptions</li>
            <li className="font-gilroy">- Reveal your true nature</li>
          </ul>
          <p className="font-gilroy">Each challenge has two outcomes:</p>
          <div className="pl-8 font-bold">
            <p className="font-gilroy">SUCCESS = Advancement</p>
            <p className="font-gilroy">FAILURE = Elimination</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl text-pink-500 font-bold">§5. THE PRIZE</h3>
          <div className="space-y-2 pl-4">
            <p className="font-gilroy">5.1. The ultimate victor will claim:</p>
            <ul className="list-none pl-8 space-y-1">
              <li className="font-gilroy">- The Crown of Victory</li>
              <li className="font-gilroy">- The Grand Prize</li>
              <li className="font-gilroy">- The Title: "Supreme Champion 2025"</li>
            </ul>
            <p className="font-gilroy">5.2. But remember: the greatest prize is proving your worth.</p>
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