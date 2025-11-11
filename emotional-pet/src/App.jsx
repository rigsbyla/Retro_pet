import { useState, useEffect } from 'react';
import Pet from './components/Pet';
import CheckIn from './components/CheckIn';
import Journal from './components/Journal';
import Stats from './components/Stats';
import { loadPetState, savePetState, updatePetHealth } from './utils/petLogic';
import './App.css';

function App() {
  const [petState, setPetState] = useState(loadPetState());
  const [showJournal, setShowJournal] = useState(false);

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
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      health: Math.min(100, prev.health + 10),
      lastCheckIn: Date.now(),
      mood: mood
    }));
  };

  const handleJournalEntry = (entry) => {
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 25),
      health: Math.min(100, prev.health + 20),
      lastJournal: Date.now(),
      journalEntries: [...prev.journalEntries, { text: entry, date: Date.now() }]
    }));
    setShowJournal(false);
  };

  return (
    <div className="app">
      <h1>Emotional Pet 🌟</h1>
      <Pet petState={petState} />
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
