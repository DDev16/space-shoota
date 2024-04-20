import React, { useEffect, useState, useRef } from "react";
import Phaser from "phaser";
import "../Game.scss";
import SettingsIcon from '../SettingsIcon'; // Import the settings icon component
import VolumeSettings from '../VolumeSettings'; // Import the volume settings component
import SpaceshipScene from "./SpaceShipScene";

const PhaserGame = ({ updateCoins, updateScore, updateLives, restartFlag, updateLevel }) => {
    const [volume, setVolume] = useState(0.5); // Default volume level
    const [showSettings, setShowSettings] = useState(false);
    const gameRef = useRef(null); // Ref to hold the Phaser game instance

    useEffect(() => {
        const isMobile = window.innerWidth < 844;
        const gameWidth = isMobile ? window.innerWidth : 750;
        const gameHeight = isMobile ? (gameWidth * 5) / 4 : 600;
    
        const config = {
            type: Phaser.AUTO,
            width: gameWidth,
            height: gameHeight,
            parent: "game-container",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: [SpaceshipScene],
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
        };
    
        const game = new Phaser.Game(config);
        gameRef.current = game;
    
        game.scene.start("SpaceshipScene", {
            updateScore,
            updateLives,
            updateCoins,
            updateLevel, // Pass the updateLevel function to the scene
            
        });
    
        return () => {
            console.log("Destroying Phaser game");
            game.destroy(true, false);
        };
    }, [updateCoins, updateScore, updateLives, restartFlag, updateLevel]); 
    
    useEffect(() => {
        if (gameRef.current) {
            gameRef.current.sound.volume = volume;
        }
    }, [volume]);

    return (
        <div id="game-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <SettingsIcon onClick={() => setShowSettings(true)} />
          <VolumeSettings isOpen={showSettings} onClose={() => setShowSettings(false)} volume={volume} setVolume={setVolume} />
        </div>
    );
};

export default PhaserGame;
