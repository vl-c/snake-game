import {ISnake} from "./GameRules";
import {Direction} from "./InputController";
import Point from "./Point";

export default class Snake implements ISnake {
    private readonly body: Point[];
    public direction: Direction = Direction.RIGHT;

    constructor(startPosition: Point, snakeLength: number) {
        this.body = Array.from({length: snakeLength}, (_, k) => ({
            x: startPosition.x,
            y: startPosition.y - k
        }))
    }

    getBody(): Point[] {
        return this.body;
    }

    getHead(): Point {
        return this.body[this.body.length - 1];
    }

    increaseBody(point: Point): void {
        this.body.push(point);
    }

    move(destination: Point): void {
        this.body.push(destination);
        this.body.shift();
    }

    makeTurn(): void {
        const nextPoint = {...this.getHead()};

        switch (this.direction) {

            case Direction.UP:
                nextPoint.y -= 1
                break

            case Direction.DOWN:
                nextPoint.y += 1
                break

            case Direction.LEFT:
                nextPoint.x -= 1
                break

            case Direction.RIGHT:
                nextPoint.x += 1
                break

        }

        this.move(nextPoint);
    }
}