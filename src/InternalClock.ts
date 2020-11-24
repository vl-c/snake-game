export class InternalClock {
    private handle: number;
    private interval: number;
    private refreshTimer: boolean;
    public isRunning: boolean;

    private readonly handler: () => any = () => {};

    private onElapsed = () => {
        if (this.refreshTimer) {
            this.stop();
            this.start();
            this.refreshTimer = false;
        }
        this.handler();
    }

    constructor(interval: number, handler: () => any) {

        this.interval = interval;
        this.handler = handler;
    }

    public start(): void {

        this.isRunning = true;
        this.handle = window.setInterval(this.onElapsed.bind(this), this.interval);
    }

    public stop(): void {

        this.isRunning = false;
        window.clearInterval(this.handle);
    }

    public increaseSpeed(amount: number): void {

        this.interval -= amount;
        this.refreshTimer = true;
    }
}