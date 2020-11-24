export class InternalClock {
    private handle: number
    private interval: number

    public isRunning: boolean
    private refreshTimer: boolean

    private readonly handler: () => any = () => {}

    private onElapsed = () => {
        if (this.refreshTimer) {
            this.stop();
            this.start();
            this.refreshTimer = false;
        }
        this.handler()
    }

    constructor(interval: number, handler: () => any) {

        this.interval = interval
        this.handler = handler
    }

    public start() {

        this.isRunning = true
        this.handle = window.setInterval(this.onElapsed.bind(this), this.interval)
    }

    public stop() {

        this.isRunning = false
        return window.clearInterval(this.handle)
    }

    public increaseSpeed(amount: number) {

        this.interval -= amount;
        this.refreshTimer = true;
    }
}