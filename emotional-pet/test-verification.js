/**
 * Manual Verification Script for AuraPet Implementation
 * This script tests all requirements from the spec
 */

import { 
  clampStat, 
  getEmotionCategory, 
  emotionEffects, 
  updatePetHealth,
  loadPetState,
  savePetState
} from './src/utils/petLogic.js';

console.log('🧪 AuraPet Verification Tests\n');

let passedTests = 0;
let failedTests = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`✅ PASS: ${description}`);
    passedTests++;
  } catch (error) {
    console.log(`❌ FAIL: ${description}`);
    console.log(`   Error: ${error.message}`);
    failedTests++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Test 1: Emotion Categorization
console.log('\n📋 Test 1: Emotion Categorization');
test('Positive emotions (happy, excited, grateful)', () => {
  assert(getEmotionCategory('happy') === 'positive', 'happy should be positive');
  assert(getEmotionCategory('excited') === 'positive', 'excited should be positive');
  assert(getEmotionCategory('grateful') === 'positive', 'grateful should be positive');
});

test('Neutral emotions (calm, neutral)', () => {
  assert(getEmotionCategory('calm') === 'neutral', 'calm should be neutral');
  assert(getEmotionCategory('neutral') === 'neutral', 'neutral should be neutral');
});

test('Negative emotions (sad, anxious, angry)', () => {
  assert(getEmotionCategory('sad') === 'negative', 'sad should be negative');
  assert(getEmotionCategory('anxious') === 'negative', 'anxious should be negative');
  assert(getEmotionCategory('angry') === 'negative', 'angry should be negative');
});

// Test 2: Stat Boundaries (0-100)
console.log('\n📋 Test 2: Stat Boundary Enforcement');
test('clampStat enforces minimum boundary (0)', () => {
  assert(clampStat(-10) === 0, 'Negative values should clamp to 0');
  assert(clampStat(-100) === 0, 'Large negative values should clamp to 0');
});

test('clampStat enforces maximum boundary (100)', () => {
  assert(clampStat(110) === 100, 'Values over 100 should clamp to 100');
  assert(clampStat(200) === 100, 'Large values should clamp to 100');
});

test('clampStat preserves valid values', () => {
  assert(clampStat(0) === 0, '0 should remain 0');
  assert(clampStat(50) === 50, '50 should remain 50');
  assert(clampStat(100) === 100, '100 should remain 100');
});

// Test 3: Emotion Effects
console.log('\n📋 Test 3: Emotion-Based Stat Effects');
test('Positive emotion effects', () => {
  const effects = emotionEffects.positive;
  assert(effects.happiness === 20, 'Positive: happiness +20');
  assert(effects.health === 5, 'Positive: health +5');
  assert(effects.hunger === -10, 'Positive: hunger -10');
  assert(effects.sickness === -5, 'Positive: sickness -5');
});

test('Neutral emotion effects', () => {
  const effects = emotionEffects.neutral;
  assert(effects.happiness === 10, 'Neutral: happiness +10');
  assert(effects.health === 10, 'Neutral: health +10');
  assert(effects.hunger === -15, 'Neutral: hunger -15');
  assert(effects.sickness === -5, 'Neutral: sickness -5');
});

test('Negative emotion effects', () => {
  const effects = emotionEffects.negative;
  assert(effects.happiness === 5, 'Negative: happiness +5');
  assert(effects.health === 3, 'Negative: health +3');
  assert(effects.hunger === -5, 'Negative: hunger -5');
  assert(effects.sickness === -5, 'Negative: sickness -5');
});

// Test 4: Decay System
console.log('\n📋 Test 4: Decay System with Time Passage');
test('Basic decay after 1 hour', () => {
  const oneHourAgo = Date.now() - (1000 * 60 * 60);
  const state = {
    health: 80,
    happiness: 80,
    hunger: 30,
    sickness: 0,
    lastCheckIn: oneHourAgo
  };
  
  const updated = updatePetHealth(state);
  
  assert(updated.health === 79, 'Health should decay by 1 per hour');
  assert(updated.happiness === 79, 'Happiness should decay by 1 per hour');
  assert(updated.hunger === 32, 'Hunger should increase by 2 per hour');
  assert(updated.sickness === 0, 'Sickness should not increase if hunger <= 70');
});

test('Hunger → Sickness cascade (hunger > 70)', () => {
  const oneHourAgo = Date.now() - (1000 * 60 * 60);
  const state = {
    health: 80,
    happiness: 80,
    hunger: 75, // Above 70 threshold
    sickness: 0,
    lastCheckIn: oneHourAgo
  };
  
  const updated = updatePetHealth(state);
  
  assert(updated.hunger === 77, 'Hunger should increase by 2');
  assert(updated.sickness === 1, 'Sickness should increase by 1 when hunger > 70');
});

test('Sickness → Health cascade (sickness > 50)', () => {
  const oneHourAgo = Date.now() - (1000 * 60 * 60);
  const state = {
    health: 80,
    happiness: 80,
    hunger: 30,
    sickness: 60, // Above 50 threshold
    lastCheckIn: oneHourAgo
  };
  
  const updated = updatePetHealth(state);
  
  // Base decay (1) + sickness penalty (2) = 3 total
  assert(updated.health === 77, 'Health should decay by 3 (base 1 + sickness penalty 2) when sickness > 50');
});

test('Full cascade: hunger > 70 AND sickness > 50', () => {
  const twoHoursAgo = Date.now() - (2 * 1000 * 60 * 60);
  const state = {
    health: 80,
    happiness: 80,
    hunger: 75,
    sickness: 55,
    lastCheckIn: twoHoursAgo
  };
  
  const updated = updatePetHealth(state);
  
  // Hunger: 75 + (2*2) = 79
  assert(updated.hunger === 79, 'Hunger should increase by 4 over 2 hours');
  
  // Sickness: 55 + (1*2) = 57 (hunger was > 70)
  assert(updated.sickness === 57, 'Sickness should increase by 2 over 2 hours');
  
  // Health: 80 - (1*2) - (2*2) = 74 (base decay + sickness penalty)
  assert(updated.health === 74, 'Health should decay by 6 total (base 2 + sickness penalty 4)');
});

// Test 5: Stat Clamping in Decay
console.log('\n📋 Test 5: Stat Boundaries During Decay');
test('Stats clamp at 0 during extreme decay', () => {
  const tenHoursAgo = Date.now() - (10 * 1000 * 60 * 60);
  const state = {
    health: 5,
    happiness: 5,
    hunger: 95,
    sickness: 95,
    lastCheckIn: tenHoursAgo
  };
  
  const updated = updatePetHealth(state);
  
  assert(updated.health >= 0, 'Health should not go below 0');
  assert(updated.happiness >= 0, 'Happiness should not go below 0');
});

test('Stats clamp at 100 during extreme increase', () => {
  const tenHoursAgo = Date.now() - (10 * 1000 * 60 * 60);
  const state = {
    health: 80,
    happiness: 80,
    hunger: 90,
    sickness: 0,
    lastCheckIn: tenHoursAgo
  };
  
  const updated = updatePetHealth(state);
  
  assert(updated.hunger <= 100, 'Hunger should not exceed 100');
  assert(updated.sickness <= 100, 'Sickness should not exceed 100');
});

// Test 6: LocalStorage Migration
console.log('\n📋 Test 6: LocalStorage State Migration');
test('Migration adds hunger and sickness to old state', () => {
  // Simulate old state without hunger/sickness
  const oldState = {
    health: 70,
    happiness: 60,
    mood: 'neutral',
    lastCheckIn: Date.now(),
    journalEntries: []
  };
  
  localStorage.setItem('aurapet-state', JSON.stringify(oldState));
  
  const loaded = loadPetState();
  
  assert(loaded.hunger === 30, 'Migration should add hunger at 30');
  assert(loaded.sickness === 0, 'Migration should add sickness at 0');
  assert(loaded.health === 70, 'Migration should preserve existing health');
  assert(loaded.happiness === 60, 'Migration should preserve existing happiness');
  
  // Cleanup
  localStorage.removeItem('aurapet-state');
});

// Test 7: Default State Values
console.log('\n📋 Test 7: Default State Initialization');
test('Default state has correct initial values', () => {
  localStorage.removeItem('aurapet-state');
  const state = loadPetState();
  
  assert(state.health === 80, 'Default health should be 80');
  assert(state.happiness === 80, 'Default happiness should be 80');
  assert(state.hunger === 30, 'Default hunger should be 30');
  assert(state.sickness === 0, 'Default sickness should be 0');
  
  localStorage.removeItem('aurapet-state');
});

// Test 8: Storage Key Update
console.log('\n📋 Test 8: Storage Key Verification');
test('Storage key is "aurapet-state"', () => {
  const testState = {
    health: 50,
    happiness: 50,
    hunger: 50,
    sickness: 50,
    lastCheckIn: Date.now()
  };
  
  savePetState(testState);
  
  const stored = localStorage.getItem('aurapet-state');
  assert(stored !== null, 'State should be stored with key "aurapet-state"');
  
  const parsed = JSON.parse(stored);
  assert(parsed.health === 50, 'Stored state should match saved state');
  
  localStorage.removeItem('aurapet-state');
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`📊 Test Summary:`);
console.log(`   ✅ Passed: ${passedTests}`);
console.log(`   ❌ Failed: ${failedTests}`);
console.log(`   📈 Total: ${passedTests + failedTests}`);
console.log('='.repeat(50));

if (failedTests === 0) {
  console.log('\n🎉 All tests passed! Implementation verified successfully.');
} else {
  console.log(`\n⚠️  ${failedTests} test(s) failed. Please review the implementation.`);
  process.exit(1);
}
