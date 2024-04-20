import React, { useState, useCallback, useEffect, useRef } from 'react';
import PhaserGame from './components/PhaserGame.js';
import './App.scss'
import { web3Modal } from './web3ModalConfig.js'; // Adjust the import path as necessary
import ConnectButton from './components/ConnectButton.js';

function App() {
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [restartFlag, setRestartFlag] = useState(false);
    const [coins, setCoins] = useState(0); // State to track coins collected
    const [level, setLevel] = useState(1); // Initialize with level 1

    const updateScore = useCallback((points) => {
        setScore(score => score + points);
    }, []);

    const updateCoins = useCallback((amount) => {
        setCoins(coins => coins + amount); // Update coin count
    }, []);

    const updateLives = useCallback((change) => {
        setLives(lives => {
            const newLives = lives + change;
            if (newLives <= 0) {
                console.log('Game Over');
                setGameOver(true); // Trigger game over state
            }
            return Math.max(newLives, 0); // Ensure lives don't go below 0
        });
    }, []);

    const updateLevel = useCallback((level) => {
        console.log(`Level updated: ${level}`); // Debug log
        setLevel(level);
    }, []);

    const restartGame = useCallback(() => {
        setScore(0);
        setLives(3);
        setCoins(0); // Reset coins on game restart
        setGameOver(false);
        setRestartFlag(prevFlag => !prevFlag); // Toggle flag to reinitialize Phaser game
    }, []);

    const gameOverSoundRef = useRef(null);

    useEffect(() => {
        if (gameOver) {
            gameOverSoundRef.current.play();
        }
    }, [gameOver]);

    const onGameOver = useCallback(() => {
        setGameOver(true);
    }, []);

    return (
        <div className="App">
                <web3Modal> {/* Wrap your components with Web3ModalProvider */}

                <header>
    <h1>Space Shooter</h1>
    <p>Score: {score} | Lives: {lives} | Coins: {coins} | Level: {level}</p>
    <ConnectButton />
</header>
            {!gameOver ? (
                <PhaserGame 
  updateScore={updateScore} 
  updateLives={updateLives} 
  updateCoins={updateCoins}
  updateLevel={updateLevel} // Pass the setLevel function as the updateLevel prop
  restartFlag={restartFlag}
  onGameOver={onGameOver}
/>

            ) : (
                <div>
                    <h2>Game Over</h2>
                    <button onClick={restartGame}>Restart</button>
                    
                </div>
            )}
            <audio ref={gameOverSoundRef} src="./assets/gameOver.wav" preload="auto"></audio>

            </web3Modal>
        </div>
    );
}

export default App;