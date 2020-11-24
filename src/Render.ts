import Point from "./Point";

export default class Render {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private readonly canvasWidth: number;
    private readonly canvasHeight: number;
    private readonly scale: number;
    private readonly rad: number;

    constructor(boardWidth: number, boardHeight: number, canvasId: string, scale: number) {
        this.canvasWidth = boardWidth*scale + scale;
        this.canvasHeight = boardHeight*scale + scale;
        this.scale = scale;
        this.rad = scale / 2;
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");
    }
    render(snakeBody: Point[], apple: Point, score: number): void {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        snakeBody.forEach((point) => this.drawStroke(point, 'black'));
        this.drawFill(apple, 'red');
        this.writeText(`${score}`, this.canvasWidth - 4, 14, 'gray', 'right', 'bold 10px serif')
    }
    drawStroke({x, y}: Point, color: string): void {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(x*this.scale+this.rad, y*this.scale+this.rad, this.rad, 0, 2*Math.PI);
        this.context.stroke();
        this.context.closePath();
    }
    drawFill({x, y}: Point, color: string): void {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(x*this.scale+this.rad, y*this.scale+this.rad, this.rad, 0, 2*Math.PI);
        this.context.fill();
        this.context.closePath();
    }
    drawGameOverScreen(finalScore: number): void {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.context.beginPath();
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.context.closePath();

        this.writeText('GAME OVER', this.canvasWidth/2, this.canvasHeight/2 - 20, 'white', 'center', 'bold 18px sans-serif');
        this.writeText(`FINAL SCORE ${finalScore}`, this.canvasWidth/2, this.canvasHeight/2 + 10, 'white', 'center', '10px sans-serif');
    }

    private writeText(text: string, x: number, y: number, color: string, align: CanvasTextAlign, font: string) {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.textAlign = align;
        this.context.font = font;
        this.context.fillText(text, x, y);
        this.context.closePath();
    }
}