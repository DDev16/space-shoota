import { moveShip, stopShip, fireBullet } from './SpaceShipControls';

export class InteractiveControls {
    static setupInteractiveControls(scene) {
        // Setup left, right, fire buttons
        scene.leftArrow = scene.add.image(50, scene.scale.height - 50, 'leftArrow').setInteractive();
        scene.rightArrow = scene.add.image(scene.scale.width - 50, scene.scale.height - 50, 'rightArrow').setInteractive();

        scene.leftArrow.on('pointerdown', () => moveShip('left', scene));
        scene.leftArrow.on('pointerup', () => stopShip('left', scene));
        scene.rightArrow.on('pointerdown', () => moveShip('right', scene));
        scene.rightArrow.on('pointerup', () => stopShip('right', scene));

        scene.fireButton = scene.add.image(scene.scale.width / 2, scene.scale.height - 50, 'fireButton').setInteractive();
        scene.fireButton.on('pointerdown', () => fireBullet(scene));
    }
}
