import Snake from "./Snake";

export enum Button {
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40
}

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export class InputController {
    snake: Snake;
    lastKey: number;

    constructor(snake: Snake) {
        this.snake = snake;
    }

    onKeyUp = (e: KeyboardEvent) => { this.lastKey = e.keyCode }

    handleInput() {

        if (!this.lastKey) { return }

        switch (this.lastKey) {

            case Button.UP:
                if (this.snake.direction != Direction.DOWN) {
                    this.snake.direction = Direction.UP
                }
                break

            case Button.DOWN:
                if (this.snake.direction != Direction.UP) {
                    this.snake.direction = Direction.DOWN
                }
                break

            case Button.LEFT:
                if (this.snake.direction != Direction.RIGHT) {
                    this.snake.direction = Direction.LEFT
                }
                break

            case Button.RIGHT:
                if (this.snake.direction != Direction.LEFT) {
                    this.snake.direction = Direction.RIGHT
                }
                break

        }

        this.lastKey = null
    }
}