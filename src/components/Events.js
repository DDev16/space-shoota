// Events.js
import Phaser from "phaser";

export const setupTimedEvents = (scene) => {
    // Spawning asteroids
    scene.time.addEvent({
        delay: 1000,
        callback: () => {
            const x = Phaser.Math.Between(0, 800);
            const asteroid = scene.asteroids.create(x, 10, "asteroid");
            asteroid.setVelocityY(Phaser.Math.Between(50, 150));
        },
        callbackScope: scene,
        loop: true,
    });

      // Add enemy ships spawning based on level data
      scene.time.addEvent({
        delay: 30000 / scene.levels[scene.currentLevel - 1].enemyFrequency, // Control frequency via level data
        callback: () => scene.spawnEnemyShip(), // Ensuring correct 'this' context
        callbackScope: scene,
        loop: true,
    });


    // Spawning shield power-ups
    scene.time.addEvent({
        delay: 10000,
        callback: () => {
            const x = Phaser.Math.Between(0, scene.scale.width);
            const shieldPowerUp = scene.shieldPowerUps.create(x, 10, "shieldPowerUp");
            shieldPowerUp.setVelocityY(Phaser.Math.Between(50, 100));
        },
        callbackScope: scene,
        loop: true,
    });

    // Spawning hearts
    scene.time.addEvent({
        delay: 20000,
        callback: () => {
            const x = Phaser.Math.Between(0, scene.scale.width);
            const heart = scene.hearts.create(x, 10, "heart");
            heart.setVelocityY(Phaser.Math.Between(50, 100));
        },
        callbackScope: scene,
        loop: true,
    });

    // Spawning double score power-ups
    scene.time.addEvent({
        delay: 15000,
        callback: () => {
            const x = Phaser.Math.Between(0, scene.scale.width);
            const doubleScorePowerUp = scene.doubleScorePowerUps.create(x, 10, "doubleScorePowerUp");
            doubleScorePowerUp.setVelocityY(Phaser.Math.Between(50, 100));
        },
        callbackScope: scene,
        loop: true,
    });

    // Spawning coins
    scene.time.addEvent({
        delay: 3000,
        callback: () => {
            const x = Phaser.Math.Between(0, 800);
            const coin = scene.coins.create(x, 10, "coin");
            coin.setVelocityY(Phaser.Math.Between(50, 150));
        },
        callbackScope: scene,
        loop: true,
    });
};
