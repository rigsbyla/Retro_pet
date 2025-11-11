import './CheckIn.css';

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😌', label: 'Calm', value: 'calm' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
  { emoji: '😴', label: 'Tired', value: 'tired' }
];

function CheckIn({ onCheckIn }) {
  return (
    <div className="checkin">
      <h3>How are you feeling?</h3>
      <div className="mood-grid">
        {moods.map(mood => (
          <button
            key={mood.value}
            className="mood-btn"
            onClick={() => onCheckIn(mood.value)}
            title={mood.label}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CheckIn;
