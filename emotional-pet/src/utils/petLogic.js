const STORAGE_KEY = 'emotional-pet-state';
const DECAY_RATE = 1; // Health/happiness decay per hour

const defaultPetState = {
  health: 80,
  happiness: 80,
  mood: 'neutral',
  lastCheckIn: Date.now(),
  lastJournal: null,
  journalEntries: [],
  createdAt: Date.now()
};

export function loadPetState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load pet state:', error);
  }
  return defaultPetState;
}

export function savePetState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save pet state:', error);
  }
}

export function updatePetHealth(state) {
  const now = Date.now();
  const hoursSinceLastCheckIn = (now - state.lastCheckIn) / (1000 * 60 * 60);
  
  const healthDecay = Math.floor(hoursSinceLastCheckIn * DECAY_RATE);
  const happinessDecay = Math.floor(hoursSinceLastCheckIn * DECAY_RATE);
  
  return {
    ...state,
    health: Math.max(0, state.health - healthDecay),
    happiness: Math.max(0, state.happiness - happinessDecay)
  };
}
