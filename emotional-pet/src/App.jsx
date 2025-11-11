import { useState, useEffect } from 'react';
import Pet from './components/Pet';
import CheckIn from './components/CheckIn';
import Journal from './components/Journal';
import Stats from './components/Stats';
import { loadPetState, savePetState, updatePetHealth, getEmotionCategory, emotionEffects, clampStat } from './utils/petLogic';
import './App.css';

function App() {
  const [petState, setPetState] = useState(loadPetState());
  const [showJournal, setShowJournal] = useState(false);
  const [attackTrigger, setAttackTrigger] = useState(0);

  useEffect(() => {
    savePetState(petState);
  }, [petState]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPetState(prev => updatePetHealth(prev));
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleCheckIn = (mood) => {
    setAttackTrigger(prev => prev + 1);
    setPetState(prev => {
      const category = getEmotionCategory(mood);
      const effects = emotionEffects[category];
      
      return {
        ...prev,
        happiness: clampStat(prev.happiness + effects.happiness),
        health: clampStat(prev.health + effects.health),
        hunger: clampStat(prev.hunger + effects.hunger),
        sickness: clampStat(prev.sickness + effects.sickness),
        lastCheckIn: Date.now(),
        mood: mood
      };
    });
  };

  const handleJournalEntry = (entry) => {
    setAttackTrigger(prev => prev + 1);
    setPetState(prev => ({
      ...prev,
      happiness: clampStat(prev.happiness + 25),
      health: clampStat(prev.health + 20),
      hunger: clampStat(prev.hunger - 20),
      sickness: clampStat(prev.sickness - 15),
      lastJournal: Date.now(),
      journalEntries: [...prev.journalEntries, { text: entry, date: Date.now() }]
    }));
    setShowJournal(false);
  };

  return (
    <div className="app">
      <h1>AuraPet 🌟</h1>
      <Pet petState={petState} triggerAttack={attackTrigger} />
      <Stats petState={petState} />
      
      {!showJournal ? (
        <>
          <CheckIn onCheckIn={handleCheckIn} />
          <button className="journal-btn" onClick={() => setShowJournal(true)}>
            📝 Write in Journal
          </button>
        </>
      ) : (
        <Journal onSubmit={handleJournalEntry} onCancel={() => setShowJournal(false)} />
      )}
    </div>
  );
}

export default App;
