import './Stats.css';

function Stats({ petState }) {
  return (
    <div className="stats">
      <div className="stat">
        <label>❤️ Health</label>
        <div className="stat-bar">
          <div 
            className="stat-fill health" 
            style={{ width: `${petState.health}%` }}
          />
        </div>
        <span>{petState.health}%</span>
      </div>
      <div className="stat">
        <label>😊 Happiness</label>
        <div className="stat-bar">
          <div 
            className="stat-fill happiness" 
            style={{ width: `${petState.happiness}%` }}
          />
        </div>
        <span>{petState.happiness}%</span>
      </div>
    </div>
  );
}

export default Stats;
