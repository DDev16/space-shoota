import Phaser from "phaser";
import "../Game.scss";
import GameAssets from "./GameAssets";
import {
  moveShip,
  stopShip,
  fireBullet,
  activateShield,
  activateDoubleScore,
} from "./SpaceShipControls";
import setupColliders from "./Colliders";
import { setupTimedEvents } from "./Events"; // Make sure to use the correct path to your Events.js file
import { InteractiveControls } from './InteractiveControls';
import { levels, setupLevel } from './Levels'; // Import the levels array from Levels.js
class SpaceshipScene extends Phaser.Scene {
  constructor() {
    super({ key: "SpaceshipScene" });
    this.updateScore = () => {};
    this.updateLives = () => {};
    this.updateCoins = () => {};
    this.updateLevel = () => {}; // Add this line
    this.restartGame = () => {}; // Add this line

    // Bind the control methods
    this.moveShip = (direction) => moveShip(direction, this);
    this.stopShip = (direction) => stopShip(direction, this);
    this.fireBullet = () =>
      fireBullet(this.spaceship, this.bullets, this.sound);
      this.doubleScoreActive = false;

    this.activateShield = () => activateShield(this); // `this` refers to the scene here
    this.activateDoubleScore = () => activateDoubleScore(this);
    this.shieldActive = false;
    this.shieldDuration = 5000; // 5 seconds in milliseconds

    this.isLeftPressed = false;
    this.isRightPressed = false;
    this.shieldSprite = null; // Initialize shieldSprite here

    this.currentLevel = 1; // Initialize current level
    this.levelDuration = 10000; // 1 minute per level, adjust as needed
    this.levels = levels; // Use levels imported from Level.js

  }

  init(data) {
    console.log(data); // Check to ensure that updateLevel function is present
    this.updateScore = data.updateScore;
    this.updateLives = data.updateLives;
    this.updateCoins = data.updateCoins;
    this.updateLevel = data.updateLevel;
  }

  preload() {
    this.load.on('filecomplete', function (key, type, data) {
        console.log(`Asset loaded: ${key}`);
    });

    this.load.on('loaderror', (file, message) => {
        console.error(`Error loading ${file.key}: ${message}`);
    });

    GameAssets.loadAssets(this);
}

  create() {
    this.initializeBackgroundMusicAndStarBackground();
    this.initializeGameObjects();
    InteractiveControls.setupInteractiveControls(this);
    setupLevel(this, this.currentLevel); // Correctly use the imported setupLevel function
    this.setupUI();
    this.setupEventListeners();
    this.initializeGameMechanics();
}

initializeBackgroundMusicAndStarBackground() {
    this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.5 });
    this.backgroundMusic.play();

    this.starBackground = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'starBackground').setOrigin(0, 0);
    this.scale.on('resize', gameSize => {
        this.starBackground.setSize(gameSize.width, gameSize.height);
    });
}

initializeGameObjects() {
    this.spaceship = this.physics.add.image(400, 550, 'spaceship').setCollideWorldBounds(true);
    this.bullets = this.physics.add.group({ classType: Phaser.Physics.Arcade.Image });
    this.enemyShips = this.physics.add.group({ classType: Phaser.Physics.Arcade.Image });  // Initialize the enemy ships group

    this.asteroids = this.physics.add.group();
    this.coins = this.physics.add.group();
    this.shieldPowerUps = this.physics.add.group();
    this.hearts = this.physics.add.group();
    this.doubleScorePowerUps = this.physics.add.group();
}

setupUI() {
    this.remainingTimeText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#FFF' });
}


setupEventListeners() {
    this.input.on('pointerup', () => {
        stopShip('left', this);
        stopShip('right', this);
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.load.on('load-error', (file) => {
        console.error('Error loading asset:', file.key);
    });
}

initializeGameMechanics() {
    setupColliders(this); // Setup all colliders
    setupTimedEvents(this); // Setup timed events for spawning objects
    setupLevel(this, this.currentLevel); // Setup initial level using imported function

}

  //Functions

  activateDoubleScore() {
    if (!this.doubleScoreActive) {
        this.doubleScoreActive = true;
        this.time.delayedCall(10000, () => { // 10 seconds
            this.doubleScoreActive = false;
        });
    }
}


spawnEnemyShip() {
    const x = Phaser.Math.Between(100, this.scale.width - 100);
    const enemyShip = this.enemyShips.create(x, 10, 'enemyShip1');
    enemyShip.setOrigin(0.5, 0.5);
    enemyShip.setDisplaySize(50, 50);
    enemyShip.setVelocityY(Phaser.Math.Between(100, 200));

    // Creating zigzag movement using a tween
    this.tweens.add({
        targets: enemyShip,
        x: { from: x, to: x + Phaser.Math.Between(-100, 100) },
        yoyo: true,
        repeat: -1,
        duration: 1500,
        ease: 'Sine.easeInOut'
    });

    enemyShip.setInteractive();
    enemyShip.on('pointerdown', () => {
        enemyShip.destroy();  // Destroy ship on click
    });
}


  spawnHeart() {
    const x = Phaser.Math.Between(0, this.scale.width);
    const heart = this.hearts.create(x, 10, "heart");
    heart.setVelocityY(Phaser.Math.Between(50, 100));
  }

  update() {
    // Movement logic for the spaceship
    if (this.isLeftPressed) {
      this.spaceship.setVelocityX(-160);
    } else if (this.isRightPressed) {
      this.spaceship.setVelocityX(160);
    } else {
      this.spaceship.setVelocityX(0);
    }

    // Arrow key movement
    if (this.cursors.left.isDown) {
      this.spaceship.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.spaceship.setVelocityX(160);
    }

    // Shield position update
    if (this.shieldActive && this.shieldSprite) {
      this.shieldSprite.x = this.spaceship.x;
      this.shieldSprite.y = this.spaceship.y - this.spaceship.height / 2 - 20; // Keep the shield in front
    }

    // Calculate the remaining time for the current level
    let elapsedTime = this.time.now - this.levelStartTime;
    let remainingTime = this.levelDuration - elapsedTime;
    let remainingSeconds = Math.round(remainingTime / 1000);

    // Update the text object to display the remaining time
    this.remainingTimeText.setText(
      `Time to next level: ${remainingSeconds} seconds`
    );

    if (remainingTime <= 0) {
        this.currentLevel = (this.currentLevel % this.levels.length) + 1;
        setupLevel(this, this.currentLevel); // Correct usage of setupLevel function
        this.updateLevel(this.currentLevel);
      }
      
    }
  }

export default SpaceshipScene;
