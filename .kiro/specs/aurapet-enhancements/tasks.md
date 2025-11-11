# Implementation Plan

- [x] 1. Update data model and core logic in petLogic.js
  - Modify `STORAGE_KEY` constant to 'aurapet-state'
  - Update `defaultPetState` to include hunger (30) and sickness (0) properties
  - Implement state migration logic in `loadPetState` to add hunger and sickness to existing saved states
  - Create `clampStat` helper function to enforce 0-100 boundaries
  - Rewrite `updatePetHealth` function to implement cascading decay mechanics (hunger increases, hunger affects sickness, sickness affects health)
  - _Requirements: 3.1, 3.2, 3.4, 3.5, 3.6, 3.7_

- [x] 2. Implement emotion-based stat effects
  - [x] 2.1 Create emotion categorization system
    - Define emotion categories (positive, neutral, negative) with mood mappings
    - Implement `getEmotionCategory` function to classify emotions
    - Create `emotionEffects` configuration object with stat changes per category
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - [x] 2.2 Update check-in handler in App.jsx
    - Modify `handleCheckIn` to use emotion categorization
    - Apply differentiated stat changes based on emotion category
    - Ensure all stats are clamped to 0-100 range
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_
  - [x] 2.3 Update journal entry handler in App.jsx
    - Modify `handleJournalEntry` to affect all four stats (happiness +25, health +20, hunger -20, sickness -15)
    - Ensure all stats are clamped to 0-100 range
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 3. Update CheckIn component with new emotion options
  - Modify moods array to include: happy, excited, grateful, calm, neutral, sad, anxious, angry
  - Update emoji and label mappings for each emotion
  - Ensure button grid displays all emotions clearly
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 4. Expand Stats component to display four stats
  - [x] 4.1 Add hunger stat display with 🍽️ emoji and progress bar
    - Create stat bar structure matching existing health/happiness format
    - Apply appropriate CSS class for hunger bar styling
    - _Requirements: 3.3_
  - [x] 4.2 Add sickness stat display with 🤒 emoji and progress bar
    - Create stat bar structure matching existing health/happiness format
    - Apply appropriate CSS class for sickness bar styling
    - _Requirements: 3.3_
  - [x] 4.3 Update Stats.css for desktop grid layout
    - Implement CSS Grid for 2x2 stat display on desktop (min-width: 800px)
    - Maintain vertical stack layout for mobile
    - Add styling for hunger and sickness stat bars with distinct colors
    - _Requirements: 3.3, 1.1, 1.3_

- [x] 5. Update Pet component for multi-stat awareness
  - Rewrite `getPetMood` function to consider all four stats with priority order (sickness > health > hunger > happiness)
  - Add new mood states: 'sick', 'unhealthy', 'hungry'
  - Update `getPetEmoji` to handle new mood states
  - Add hunger and sickness-based messages to pet display
  - Update Pet.css to style new mood states appropriately
  - _Requirements: 3.1, 3.2, 3.6, 3.7_

- [x] 6. Implement desktop-optimized layout
  - [x] 6.1 Update App.css for wider desktop layout
    - Change max-width from 600px to 900px
    - Add media query for screens > 1200px with increased horizontal padding
    - Maintain responsive behavior for mobile (< 800px)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [x] 6.2 Optimize component spacing for desktop
    - Adjust padding and margins for better use of horizontal space
    - Ensure components are visually balanced at 900px width
    - Test layout at 800px, 1200px, and 1920px breakpoints
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 7. Rebrand application to AuraPet
  - Update title in App.jsx from "Emotional Pet 🌟" to "AuraPet 🌟"
  - Update document title in index.html to "AuraPet"
  - Update README.md with new branding (title, description, references)
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 8. Verify and test implementation
  - Test emotion categorization with all mood options
  - Verify stat boundaries remain 0-100 after all operations
  - Test decay system by simulating time passage
  - Verify localStorage migration for existing users
  - Test responsive layout at multiple screen sizes
  - Verify all four stats display correctly
  - Test hunger → sickness → health cascade behavior
  - _Requirements: All_
