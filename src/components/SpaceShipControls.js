// SpaceshipControls.js

export function moveShip(direction, spaceship) {
    if (direction === 'left') {
        spaceship.isLeftPressed = true;
    } else if (direction === 'right') {
        spaceship.isRightPressed = true;
    }
}

export function stopShip(direction, spaceship) {
    if (direction === 'left') {
        spaceship.isLeftPressed = false;
    } else if (direction === 'right') {
        spaceship.isRightPressed = false;
    }
}

export const fireBullet = (scene) => {
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
};

// Assuming this is the structure of your activateShield function.
export const activateShield = (scene) => {
    if (!scene.shieldActive) {
        scene.shieldActive = true;
        scene.shieldSprite = scene.add.image(scene.spaceship.x, scene.spaceship.y - scene.spaceship.height / 2 - 10, "shieldPowerUp").setScale(1.5);
        scene.shieldSprite.setDepth(1);

        scene.time.delayedCall(scene.shieldDuration, () => {
            scene.shieldActive = false;
            if (scene.shieldSprite) {
                scene.shieldSprite.destroy();
            }
        });

        scene.sound.play("shield");
    }
};



export function activateDoubleScore(scene) {
    scene.doubleScoreActive = true;

    // Assuming the double score effect should last for a limited time
    scene.time.delayedCall(10000, () => { // 10 seconds duration for double score
        scene.doubleScoreActive = false;
    });
}
