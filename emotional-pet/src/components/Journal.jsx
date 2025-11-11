import { useState } from 'react';
import './Journal.css';

function Journal({ onSubmit, onCancel }) {
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim()) {
      onSubmit(entry);
      setEntry('');
    }
  };

  return (
    <div className="journal">
      <h3>Journal Entry</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="What's on your mind today?"
          rows="6"
          autoFocus
        />
        <div className="journal-actions">
          <button type="submit" disabled={!entry.trim()}>
            Save Entry
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Journal;
