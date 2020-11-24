import GameRules from "./GameRules";
import Snake from "./Snake";
import Render from "./Render";
import Apple from "./Apple";
import {BOARD_HEIGHT, BOARD_WIDTH, DEFAULT_SNAKE_LENGTH, DEFAULT_START_POINT, SCALE} from "./Options";
import {InputController} from "./InputController";
import {InternalClock} from "./InternalClock";

export class Game {
    static gr = GameRules;
    static snake = new Snake(DEFAULT_START_POINT, DEFAULT_SNAKE_LENGTH);
    static apple = new Apple(BOARD_WIDTH, BOARD_HEIGHT);
    static render = new Render(BOARD_WIDTH, BOARD_HEIGHT, 'canvas', SCALE);
    static controller = new InputController(Game.snake);
    static score = 0;
    private static clock: InternalClock;

    private static init() {
        const body: HTMLBodyElement = document.querySelector("body")
        body.onkeyup = this.controller.onKeyUp
    }

    static onGameTick() {
        Game.controller.handleInput();
        Game.snake.makeTurn();
        const isAlive = Game.gr.isSnakeIsAlive(Game.snake);
        const hasAdditionalPoint = Game.gr.appleCheck(Game.snake, Game.apple);
        if (isAlive) {
            Game.score += 1;
            Game.render.render(Game.snake.getBody(), Game.apple.getLocation(), Game.score)
        } else {
            Game.clock.stop()
            Game.render.drawGameOverScreen(Game.score)
        }
        if (hasAdditionalPoint) {
            Game.score += Math.floor(Game.score/10) + 50;
            Game.clock.increaseSpeed(10 - Math.min(9, Math.floor(Game.score/100)));
        }
    }

    static start() {
        this.init()
        Game.clock = new InternalClock(200, Game.onGameTick)
        Game.clock.start()
    }
}
Game.start()
