import Phaser from "phaser";
import Scene1 from './scenes/scene1';

export const gameSettings = {
    playerSpeed: 250
}

export const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    scene: Scene1,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
};

export let game;

export function startGame() {
    game = new Phaser.Game(config);
}
