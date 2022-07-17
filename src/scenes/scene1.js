import Phaser from "phaser";
import { config, gameSettings, game } from "../config";

class Scene1 extends Phaser.Scene {
    preload() {
        this.load.image('knight_idle_0', './assets/frames/knight_f_idle_anim_f0.png');
        this.load.image('knight_idle_1', './assets/frames/knight_f_idle_anim_f1.png');
        this.load.image('knight_idle_2', './assets/frames/knight_f_idle_anim_f2.png');
        this.load.image('knight_idle_3', './assets/frames/knight_f_idle_anim_f3.png');
        this.load.image('knight_run_0', './assets/frames/knight_f_run_anim_f0.png');
        this.load.image('knight_run_1', './assets/frames/knight_f_run_anim_f1.png');
        this.load.image('knight_run_2', './assets/frames/knight_f_run_anim_f2.png');
        this.load.image('knight_run_3', './assets/frames/knight_f_run_anim_f3.png');

        this.load.image('floor', './assets/frames/floor_1.png');
    }

    create() {
        this.anims.create({
            key: 'knight_idle_anim',
            frames: [
                { key: 'knight_idle_0' },
                { key: 'knight_idle_1' },
                { key: 'knight_idle_2' },
                { key: 'knight_idle_3' }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'knight_run_anim',
            frames: [
                { key: 'knight_run_0' },
                { key: 'knight_run_1' },
                { key: 'knight_run_2' },
                { key: 'knight_run_3' }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.floor = this.add.tileSprite(0, 0, config.width, config.height,'floor')
        this.floor.setScale(3);

        this.knight = this.physics.add.sprite(config.width / 2, config.height / 2, 'knight_idle_0');
        this.knight.play('knight_idle_anim');
        this.knight.setScale(3);
        this.knight.setImmovable(true);
        this.knight.setImmovable()

        this.w_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.s_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.d_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // bouncy ball
        this.circle = this.add.circle(200, 200, 50, 0xff5733);
        this.physics.add.existing(this.circle);
        this.circle.body.collideWorldBounds = true;
        this.circle.body.setBounce(1, 1);
        this.circle.body.setVelocityX(300);
        this.circle.body.setVelocityY(300);
        this.circle.body.setMaxVelocity(300, 300);
    }

    update() {
        this.physics.collide(this.circle, this.knight);
        this.movePlayerManager();
    }

    movePlayerManager() {
        // set animation based on whether they are moving
        if(this.knight.body.velocity.x === 0 && this.knight.body.velocity.x === 0) {
            this.knight.play('knight_idle_anim', true);
        }
        else {
            this.knight.play('knight_run_anim', true);
        }

        if(this.a_key.isDown) {
            this.knight.setFlipX(true);
            this.knight.setVelocityX(-gameSettings.playerSpeed);
        }
        else if(this.d_key.isDown) {
            this.knight.setFlipX(false);
            this.knight.setVelocityX(gameSettings.playerSpeed);
        }
        else {
            this.knight.setVelocityX(0);
        }

        if(this.w_key.isDown) {
            this.knight.setVelocityY(-gameSettings.playerSpeed);
        }
        else if(this.s_key.isDown) {
            this.knight.setVelocityY(gameSettings.playerSpeed);
        }
        else {
            this.knight.setVelocityY(0);
        }
    }
}

export default Scene1;
