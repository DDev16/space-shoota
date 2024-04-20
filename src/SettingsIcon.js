// SettingsIcon.jsx
import React from 'react';
import { FaCog } from 'react-icons/fa'; // Example using react-icons

const SettingsIcon = ({ onClick }) => (
  <button onClick={onClick} style={{ position: 'fixed', top: 20, right: 20, zIndex: 100 }}>
    <FaCog size={32} />
  </button>
);

export default SettingsIcon;
