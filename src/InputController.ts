import Snake from "./Snake";

export enum Button {
    LEFT = 'ArrowLeft',
    UP = 'ArrowUp',
    RIGHT = 'ArrowRight',
    DOWN = 'ArrowDown'
}

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export class InputController {
    snake: Snake;
    lastKey: string;

    constructor(snake: Snake) {
        this.snake = snake;
    }

    onKeyUp = (e: KeyboardEvent): void => { this.lastKey = e.code }

    handleInput(): void {

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