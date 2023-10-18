import * as Phaser from "phaser";

import starfieldUrl from "/assets/starfield.png";

export default class Play extends Phaser.Scene {
  fire?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;

  fired?: boolean;

  starfield?: Phaser.GameObjects.TileSprite;
  spinner?: Phaser.GameObjects.Shape;
  enemy1?: Phaser.GameObjects.Shape;
  enemy2?: Phaser.GameObjects.Shape;
  enemy3?: Phaser.GameObjects.Shape;

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("starfield", starfieldUrl);
  }

  #addKey(
    name: keyof typeof Phaser.Input.Keyboard.KeyCodes,
  ): Phaser.Input.Keyboard.Key {
    return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
  }

  create() {
    this.fire = this.#addKey("F");
    this.left = this.#addKey("LEFT");
    this.right = this.#addKey("RIGHT");

    this.fired = false;

    this.starfield = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "starfield",
      )
      .setOrigin(0, 0);

    this.spinner = this.add.rectangle(640 / 2, 470, 15, 15, 0xb300db);
    this.enemy1 = this.add.rectangle(640, 270, 60, 40, 0xb300db);
    this.enemy2 = this.add.rectangle(700, 200, 60, 40, 0xb300db);
    this.enemy3 = this.add.rectangle(760, 130, 60, 40, 0xb300db);
  }

  update() {
    this.starfield!.tilePositionX -= 4;
    this.enemy1!.x -= 2;
    this.enemy2!.x -= 2;
    this.enemy3!.x -= 2;

    if (this.enemy1!.x == -40) {
      this.enemy1!.x = 640;
    }
    if (this.enemy2!.x == -40) {
      this.enemy2!.x = 700;
    }
    if (this.enemy3!.x == -40) {
      this.enemy3!.x = 760;
    }

    if (this.checkCollision(this.spinner!, this.enemy1!)) {
      this.spinner!.x = 640 / 2;
      this.spinner!.y = 470;
      this.fired = false;
      this.enemy1!.x = 640;
      this.enemy1!.y = 270;
    }

    if (this.checkCollision(this.spinner!, this.enemy2!)) {
      this.spinner!.x = 640 / 2;
      this.spinner!.y = 470;
      this.fired = false;
      this.enemy2!.x = 700;
      this.enemy2!.y = 200;
    }

    if (this.checkCollision(this.spinner!, this.enemy3!)) {
      this.spinner!.x = 640 / 2;
      this.spinner!.y = 470;
      this.fired = false;
      this.enemy3!.x = 760;
      this.enemy3!.y = 130;
    }

    if (this.fired == true) {
      this.spinner!.y -= 2;
      if (this.spinner!.y == 0) {
        this.fired = false;
        this.spinner!.y = 470;
      }
    }

    if (this.left!.isDown && this.fired == false) {
      this.spinner!.x -= 2;
    }
    if (this.right!.isDown && this.fired == false) {
      this.spinner!.x += 2;
    }

    if (this.fire!.isDown) {
      this.fired = true;
    }
  }
  checkCollision(
    spinner: Phaser.GameObjects.Shape,
    enemy: Phaser.GameObjects.Shape,
  ) {
    if (
      spinner.x < enemy.x + enemy.width &&
      spinner.x + spinner.width > enemy.x &&
      spinner.y < enemy.y + enemy.height &&
      spinner.height + spinner.y > enemy.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}
