import './Pet.css';

function Pet({ petState }) {
  const getPetMood = () => {
    // Priority order: sickness > health > hunger > happiness
    if (petState.sickness > 50) return 'sick';
    if (petState.health < 30) return 'unhealthy';
    if (petState.hunger > 70) return 'hungry';
    if (petState.happiness < 30) return 'sad';
    if (petState.health > 70 && petState.happiness > 70 && petState.hunger < 30) return 'happy';
    return 'neutral';
  };

  const getPetEmoji = () => {
    const mood = getPetMood();
    switch(mood) {
      case 'happy': return '✨🐾✨';
      case 'sick': return '🤒🐾🤒';
      case 'unhealthy': return '💔🐾💔';
      case 'hungry': return '🍽️🐾🍽️';
      case 'sad': return '💤🐾💤';
      default: return '🐾';
    }
  };

  const getPetMessage = () => {
    const mood = getPetMood();
    switch(mood) {
      case 'sick': return "I'm not feeling well...";
      case 'unhealthy': return "I need some care...";
      case 'hungry': return "I'm hungry...";
      case 'sad': return "I could use some attention...";
      case 'happy': return "I'm feeling great!";
      default: return "How are you today?";
    }
  };

  return (
    <div className={`pet pet-${getPetMood()}`}>
      <div className="pet-sprite">
        {getPetEmoji()}
      </div>
      <div className="pet-message">
        {getPetMessage()}
      </div>
    </div>
  );
}

export default Pet;
