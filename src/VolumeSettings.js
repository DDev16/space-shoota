// VolumeSettings.jsx
import React from 'react';

const VolumeSettings = ({ isOpen, onClose, volume, setVolume }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '8px', zIndex: 101 }}>
      <h2>Settings</h2>
      <div>
        <label>Volume: </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
      <br />
      <div>
        <label>Instructions: </label>
        <p>Use the arrow keys to move and the space bar to shoot.</p>
        <p>If you are on mobile use controls on screen.</p>
      </div>
      

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default VolumeSettings;
