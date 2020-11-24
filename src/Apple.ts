import {IApple} from "./GameRules";
import Point from "./Point";

export default class Apple implements IApple {

    location: Point;

    constructor(boardWidth: number, boardHeight: number) {
        this.place(boardWidth, boardHeight);
    }

    place(boardWidth: number, boardHeight: number): void {
        this.location = {
            x: Math.floor(Math.random() * boardWidth),
            y: Math.floor(Math.random() * boardHeight)
        }
    }

    getLocation(): Point {
        return this.location;
    }
}