
import Phaser from "phaser";
// Collider.js
const setupColliders = (scene) => {
    // Spaceship with Shield Power-ups
    scene.physics.add.collider(scene.spaceship, scene.shieldPowerUps, (spaceship, powerUp) => {
        powerUp.destroy(); // Remove the power-up item
        scene.activateShield(); // Activate the shield
    });

    // Bullets with Asteroids
    scene.physics.add.collider(scene.bullets, scene.asteroids, (bullet, asteroid) => {
        bullet.destroy();
        asteroid.destroy();
        // Apply score multiplier if doubleScoreActive is true
        scene.updateScore(scene.doubleScoreActive ? 20 : 10);
        // Play explosion sound
        scene.sound.play("explosion");
    });

    // Spaceship with Coins
    scene.physics.add.collider(scene.spaceship, scene.coins, (spaceship, coin) => {
        coin.destroy();
        scene.updateCoins(1);
        // Play the coin collection sound effect
        scene.sound.play("coinCollect");
    });

    // Spaceship with Double Score Power-ups
    scene.physics.add.collider(scene.spaceship, scene.doubleScorePowerUps, (spaceship, powerUp) => {
        powerUp.destroy(); // Remove the power-up from the scene
        scene.activateDoubleScore(); // Activate the double score effect
    });

    // Setup automatic coin spawning
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

    // Space key to fire a bullet
    scene.input.keyboard.on("keydown-SPACE", () => {
        const bullet = scene.bullets.create(scene.spaceship.x, scene.spaceship.y - 20, "bullet");
        bullet.setCollideWorldBounds(true);
        bullet.setVelocityY(-300);
        bullet.body.onWorldBounds = true;
        bullet.body.world.on("worldbounds", (body) => {
            if (body.gameObject === bullet) {
                bullet.destroy();
            }
        }, scene);
        // Play laser sound
        scene.sound.play("laser");
    });

     // Collider for spaceship and asteroids
     scene.physics.add.collider(scene.spaceship, scene.asteroids, (spaceship, asteroid) => {
        if (scene.shieldActive) {
            // Play deflection sound
            scene.sound.play("deflection");
            
            // Instead of destroying the asteroid, invert its Y velocity to simulate a bounce
            const bounceVelocityY = -asteroid.body.velocity.y * 1.1; // Reverse and increase the speed a bit
            const randomXVelocity = Phaser.Math.Between(-100, 100); // Randomize the X velocity for variety
            
            asteroid.setVelocityY(bounceVelocityY);
            asteroid.setVelocityX(randomXVelocity);

            // Optionally, add some spin or other visual effect to indicate the deflection
        } else {
            scene.updateLives(-1);
            if (scene.lives <= 0) {
                console.log("Game Over");
                scene.scene.pause();
            } else {
                // Normally handling collision with the spaceship when the shield is not active
                asteroid.setY(-10); // This line might be redundant if you're just going to reset or destroy the asteroid
                asteroid.setX(Phaser.Math.Between(0, 800));
                asteroid.setVelocityY(Phaser.Math.Between(50, 150));
            }
            
            // Play crash sound
            scene.sound.play("crash");
        }
    });


    // Collider for Bullets and Spaceship
    scene.physics.add.collider(scene.bullets, scene.enemyShips, (bullet, enemyShip) => {
        bullet.destroy();
        enemyShip.destroy();
        scene.updateScore(scene.doubleScoreActive ? 20 : 10);
        scene.sound.play("explosion");
    });

    // Collider for spaceship and enemy ships
    scene.physics.add.collider(scene.spaceship, scene.enemyShips, (spaceship, enemyShip) => {
        if (scene.shieldActive) {
            // Play deflection sound
            scene.sound.play("deflection");
            
            // Instead of destroying the enemy ship, invert its Y velocity to simulate a bounce
            const bounceVelocityY = -enemyShip.body.velocity.y * 1.1; // Reverse and increase the speed a bit
            const randomXVelocity = Phaser.Math.Between(-100, 100); // Randomize the X velocity for variety
            
            enemyShip.setVelocityY(bounceVelocityY);
            enemyShip.setVelocityX(randomXVelocity);

            // Optionally, add some spin or other visual effect to indicate the deflection
        } else {
            scene.updateLives(-1);
            if (scene.lives <= 0) {
                console.log("Game Over");
                scene.scene.pause();
            } else {
                // Normally handling collision with the spaceship when the shield is not active
                enemyShip.setY(-10); // This line might be redundant if you're just going to reset or destroy the enemy ship
                enemyShip.setX(Phaser.Math.Between(0, 800));
                enemyShip.setVelocityY(Phaser.Math.Between(50, 150));
            }
            
            // Play crash sound
            scene.sound.play("crash");
        }
    });

    // Collider for spaceship and hearts
    scene.physics.add.collider(scene.spaceship, scene.hearts, (spaceship, heart) => {
        heart.destroy(); // Remove the heart after collecting
        scene.updateLives(1); // Assuming this method increases the player's lives

        // Play a sound effect or animation
        scene.sound.play("heartCollect");
    });
};

export default setupColliders;
