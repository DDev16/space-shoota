export default class GameUI {
    constructor(scene) {
      this.scene = scene;
      // Initialize UI elements here, e.g., score text, lives display, etc.
      this.scoreText = scene.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
      this.livesText = scene.add.text(16, 56, 'Lives: 3', { fontSize: '32px', fill: '#FFF' });
      this.coinsText = scene.add.text(16, 96, 'Coins: 0', { fontSize: '32px', fill: '#FFF' });
    }
  
    updateScore(score) {
      this.scoreText.setText(`Score: ${score}`);
    }
  
    updateLives(lives) {
      this.livesText.setText(`Lives: ${lives}`);
    }
  
    updateCoins(coins) {
      this.coinsText.setText(`Coins: ${coins}`);
    }
  }
  