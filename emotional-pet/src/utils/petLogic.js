const STORAGE_KEY = 'aurapet-state';
const DECAY_RATE = 1; // Health/happiness decay per hour

const defaultPetState = {
  health: 80,
  happiness: 80,
  hunger: 30,
  sickness: 0,
  mood: 'neutral',
  lastCheckIn: Date.now(),
  lastJournal: null,
  journalEntries: [],
  createdAt: Date.now()
};

// Helper function to enforce 0-100 boundaries
export function clampStat(value) {
  return Math.max(0, Math.min(100, value));
}

export function loadPetState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedState = JSON.parse(saved);
      // State migration: add hunger and sickness to existing saved states
      if (parsedState.hunger === undefined) {
        parsedState.hunger = 30;
      }
      if (parsedState.sickness === undefined) {
        parsedState.sickness = 0;
      }
      return parsedState;
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

// Emotion categorization system
const emotionCategories = {
  positive: ['happy', 'excited', 'grateful'],
  neutral: ['calm', 'neutral'],
  negative: ['sad', 'anxious', 'angry']
};

// Stat effects per emotion category
export const emotionEffects = {
  positive: { happiness: 20, health: 5, hunger: -10, sickness: -5 },
  neutral: { happiness: 10, health: 10, hunger: -15, sickness: -5 },
  negative: { happiness: 5, health: 3, hunger: -5, sickness: -5 }
};

// Classify emotion into category
export function getEmotionCategory(emotion) {
  if (emotionCategories.positive.includes(emotion)) return 'positive';
  if (emotionCategories.neutral.includes(emotion)) return 'neutral';
  return 'negative';
}

export function updatePetHealth(state) {
  const now = Date.now();
  const hoursSinceLastCheckIn = (now - state.lastCheckIn) / (1000 * 60 * 60);
  
  // Base decay rates
  let healthDecay = hoursSinceLastCheckIn * DECAY_RATE;
  const happinessDecay = hoursSinceLastCheckIn * DECAY_RATE;
  const hungerIncrease = hoursSinceLastCheckIn * 2;
  let sicknessIncrease = 0;
  
  // Calculate new hunger first
  const newHunger = clampStat(state.hunger + hungerIncrease);
  
  // If hungry (hunger > 70), increase sickness
  if (newHunger > 70) {
    sicknessIncrease = hoursSinceLastCheckIn * 1;
  }
  
  // Calculate new sickness
  const newSickness = clampStat(state.sickness + sicknessIncrease);
  
  // If sick (sickness > 50), additional health decay
  if (newSickness > 50) {
    healthDecay += hoursSinceLastCheckIn * 2;
  }
  
  return {
    ...state,
    health: clampStat(state.health - healthDecay),
    happiness: clampStat(state.happiness - happinessDecay),
    hunger: newHunger,
    sickness: newSickness
  };
}
