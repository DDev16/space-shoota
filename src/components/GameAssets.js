class GameAssets {
    static loadAssets(scene) {
        // Load images
        scene.load.image("spaceship", "/assets/spaceship.png");
        scene.load.image("bullet", "/assets/bullet.png");
        scene.load.image("shieldPowerUp", "/assets/shield.png"); // Ensure this matches your actual file path
        scene.load.image("asteroid", "/assets/asteroid.png");
        scene.load.image("heart", "/assets/heart.png"); // Make sure the path matches your heart image file
        scene.load.image("coin", "/assets/coin.png");
        scene.load.image("starBackground", "/assets/stars.jpg");
        scene.load.image("leftArrow", "/assets/leftArrow.png");
        scene.load.image("rightArrow", "/assets/rightArrow.png");
        scene.load.image("doubleScorePowerUp", "/assets/x2.png"); // Adjust path as needed
        scene.load.image("fireButton", "/assets/button.png"); // Ensure this matches the actual file path
        scene.load.image("pauseButton", "/assets/pause.png");
        scene.load.image("playButton", "/assets/play.png");
        scene.load.image("enemyShip1", "/assets/enemy1.png");
        
        // Load audio
        scene.load.audio("laser", "/assets/laser.wav");
        scene.load.audio("explosion", "/assets/asterExplode.wav");
        scene.load.audio("backgroundMusic", "/assets/song.mp3"); // Add this line
        scene.load.audio("coinCollect", "/assets/coin.wav");
        scene.load.audio("crash", "/assets/crash.wav");
        scene.load.audio("shield", "/assets/shield.wav");
        scene.load.audio("deflection", "/assets/deflection.wav");
        scene.load.audio("heartCollect", "/assets/heart.wav");
    }
}

export default GameAssets;
