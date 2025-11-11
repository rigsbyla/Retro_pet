import './Pet.css';

function Pet({ petState }) {
  const getPetMood = () => {
    if (petState.health < 30 || petState.happiness < 30) return 'sad';
    if (petState.health > 70 && petState.happiness > 70) return 'happy';
    return 'neutral';
  };

  const getPetEmoji = () => {
    const mood = getPetMood();
    switch(mood) {
      case 'happy': return '✨🐾✨';
      case 'sad': return '💤🐾💤';
      default: return '🐾';
    }
  };

  return (
    <div className={`pet pet-${getPetMood()}`}>
      <div className="pet-sprite">
        {getPetEmoji()}
      </div>
      <div className="pet-message">
        {petState.health < 30 && "I need some care..."}
        {petState.health >= 30 && petState.happiness > 70 && "I'm feeling great!"}
        {petState.health >= 30 && petState.happiness <= 70 && "How are you today?"}
      </div>
    </div>
  );
}

export default Pet;
