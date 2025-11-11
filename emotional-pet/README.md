# AuraPet 🐾

A retro Tamagotchi-style web app where you care for a digital pet by checking in with your emotions and journaling.

## Features

- 🎭 Emotional check-ins with 8 different moods
- 📝 Journal entries for deeper reflection
- ❤️ Four pet stats: health, happiness, hunger, and sickness
- 💾 LocalStorage persistence (your pet remembers you!)
- 🎨 Retro-inspired design with smooth animations
- ⏰ Pet stats decay over time (check in regularly!)
- 🖥️ Desktop-optimized layout for comfortable viewing

## Getting Started

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your pet!

## How It Works

- **Check-ins**: Quick mood selections affect your pet's stats differently based on emotion type (positive, neutral, or negative)
- **Journal entries**: Writing gives balanced boosts across all stats (happiness +25, health +20, hunger -20, sickness -15)
- **Decay system**: Complex Tamagotchi-style mechanics where hunger increases over time, high hunger causes sickness, and high sickness affects health
- **LocalStorage**: All data is saved locally in your browser under the 'aurapet-state' key

## Future Enhancements

- [ ] Firebase integration for cloud sync
- [ ] Multiple pet types/skins
- [ ] Achievement system
- [ ] Mood history visualization
- [ ] Journal entry history viewer
- [ ] Notifications/reminders
- [ ] Pet evolution stages

## Tech Stack

- React 18
- Vite
- LocalStorage API
- CSS3 animations
