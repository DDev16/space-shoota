import Phaser from "phaser";

// Define the structure and behavior of each level
const levels = [
    { asteroidSpeed: 100, enemyFrequency: 0 }, // Level 1
    { asteroidSpeed: 150, enemyFrequency: 1 }, // Level 2
    { asteroidSpeed: 200, enemyFrequency: 2 }, // Level 3
    { asteroidSpeed: 250, enemyFrequency: 3 }, // Level 4
    { asteroidSpeed: 300, enemyFrequency: 4 }, // Level 5
    { asteroidSpeed: 350, enemyFrequency: 5 }, // Level 6
    { asteroidSpeed: 400, enemyFrequency: 6 }, // Level 7
    { asteroidSpeed: 450, enemyFrequency: 7 }, // Level 8
    { asteroidSpeed: 500, enemyFrequency: 8 }, // Level 9
    { asteroidSpeed: 550, enemyFrequency: 9 }, // Level 10
    { asteroidSpeed: 600, enemyFrequency: 10 }, // Level 11
  ];
  
  // Function to set up a specific level in the game scene
  function setupLevel(scene, levelIndex) {
    const levelData = levels[levelIndex - 1]; // Retrieve the current level's data
  
    // Reset level start time
    scene.levelStartTime = scene.time.now;
  
    // Setup asteroids according to the current level's speed
    scene.time.addEvent({
      delay: 1000 - levelIndex * 100, // Decrease delay as level increases to increase challenge
      callback: () => {
        const x = Phaser.Math.Between(0, scene.scale.width); // Random x within bounds
        const asteroid = scene.asteroids.create(x, 0, "asteroid");
        asteroid.setVelocityY(levelData.asteroidSpeed);
      },
      loop: true,
    });
  
    // Increase enemy frequency based on the level configuration
    if (levelData.enemyFrequency > 0) {
      scene.time.addEvent({
        delay: 30000 / levelData.enemyFrequency, // Decrease delay to increase frequency
        callback: () => {
          // Implement enemy ship spawning logic
          scene.spawnEnemyShip(); // You need to define this method in your scene
        },
        loop: true,
      });
    }
  
    // Additional setup based on the level (e.g., background changes, power-ups, etc.) can be added here
  }
  
  export { levels, setupLevel };
  
  

  