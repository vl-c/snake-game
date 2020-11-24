import {BOARD_HEIGHT, BOARD_WIDTH} from "./Options";
import {Direction} from "./InputController";
import Point from "./Point";

export interface IApple {
    location: Point;
    getLocation: () => Point;
    place: (boardWidth: number, boardHeight: number) => void;
}
export interface ISnake {
    increaseBody: (point: Point) => void;
    direction: Direction;
    getHead: () => Point;
    getBody: () => Point[];
}

export default class GameRules {

    private static boardWidth: number = BOARD_WIDTH;
    private static boardHeight: number = BOARD_HEIGHT;

    static replaceApple(snake: ISnake, apple: IApple): void {
        let correctPlace;
        while (!correctPlace) {
            apple.place(GameRules.boardWidth, GameRules.boardHeight);
            correctPlace = !GameRules.hasBiteHimself(apple.location, snake.getBody());
        }
    }

    static isSnakeIsAlive(snake: ISnake): boolean {
        return !GameRules.hasBiteHimself(snake.getHead(), snake.getBody()) && !GameRules.pointOutOfBoundaries(snake.getHead());
    }

    static hasBiteHimself(point: Point, arr: Point[]): boolean {
        return arr.some((i, n, arr) => {
            return i.x === point.x && i.y === point.y && n !== arr.length - 1;
        });
    }

    static pointOutOfBoundaries(point: Point): boolean {
        return point.x > GameRules.boardWidth || point.x < 0 || point.y > GameRules.boardHeight || point.y < 0;
    }

    static isAppleEaten(snake: ISnake, apple: IApple): boolean {
        const snakeHeadLocation = snake.getHead();
        const appleLocation = apple.getLocation();
        return snakeHeadLocation.x === appleLocation.x && snakeHeadLocation.y === appleLocation.y;
    }

    static appleCheck(snake: ISnake, apple: IApple): boolean {
        if (this.isAppleEaten(snake, apple)) {
            snake.increaseBody(apple.getLocation());
            this.replaceApple(snake, apple);
            return true;
        }
        return false;
    }
}