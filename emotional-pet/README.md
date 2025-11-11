# Emotional Pet 🐾

A retro Tamagotchi-style web app where you care for a digital pet by checking in with your emotions and journaling.

## Features

- 🎭 Emotional check-ins with 6 different moods
- 📝 Journal entries for deeper reflection
- ❤️ Pet health and happiness stats
- 💾 LocalStorage persistence (your pet remembers you!)
- 🎨 Retro-inspired design with smooth animations
- ⏰ Pet stats decay over time (check in regularly!)

## Getting Started

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your pet!

## How It Works

- **Check-ins**: Quick mood selections boost your pet's health (+10) and happiness (+15)
- **Journal entries**: Writing gives bigger boosts (health +20, happiness +25)
- **Decay system**: Pet stats decrease by 1 point per hour if neglected
- **LocalStorage**: All data is saved locally in your browser

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
