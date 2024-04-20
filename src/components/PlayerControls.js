// PlayerControls.js
class PlayerControls {
  constructor(scene) {
    this.scene = scene;
    this.isLeftPressed = false;
    this.isRightPressed = false;

    // Setup touch controls
    this.setupTouchControls();

    // Setup keyboard controls
    this.setupKeyboardControls();
  }

  setupTouchControls() {
    // Assuming leftArrow, rightArrow, and fireButton are set up in the scene
    this.scene.leftArrow.on('pointerdown', () => this.moveShip('left'));
    this.scene.leftArrow.on('pointerup', this.stopShip.bind(this, 'left'));
    this.scene.rightArrow.on('pointerdown', () => this.moveShip('right'));
    this.scene.rightArrow.on('pointerup', this.stopShip.bind(this, 'right'));
    this.scene.fireButton.on('pointerdown', this.scene.fireBullet, this.scene);
    this.scene.input.on('pointerup', () => {
      this.stopShip('left');
      this.stopShip('right');
    });
  }

  setupKeyboardControls() {
    this.scene.input.keyboard.on("keydown-LEFT", () => this.moveShip('left'));
    this.scene.input.keyboard.on("keydown-RIGHT", () => this.moveShip('right'));
    this.scene.input.keyboard.on("keyup-LEFT", () => this.stopShip('left'));
    this.scene.input.keyboard.on("keyup-RIGHT", () => this.stopShip('right'));
    this.scene.input.keyboard.on("keydown-SPACE", this.scene.fireBullet.bind(this.scene));
  }

  moveShip(direction) {
    if (direction === 'left') {
      this.isLeftPressed = true;
    } else if (direction === 'right') {
      this.isRightPressed = true;
    }
  }

  stopShip(direction) {
    if (direction === 'left') {
      this.isLeftPressed = false;
    } else if (direction === 'right') {
      this.isRightPressed = false;
    }
  }

  update() {
    if (this.isLeftPressed) {
      this.scene.spaceship.setVelocityX(-160);
    } else if (this.isRightPressed) {
      this.scene.spaceship.setVelocityX(160);
    } else {
      this.scene.spaceship.setVelocityX(0);
    }
  }
}

export default PlayerControls;
