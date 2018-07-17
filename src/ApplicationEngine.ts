export abstract class ApplicationEngine {
	private readonly _canvas: HTMLCanvasElement;

	private _running: boolean = false;
	private _requestFrameId: number = 0;
	private _lastUpdateTime = 0;

    constructor(canvas: HTMLCanvasElement) {
		this._canvas = canvas;

		// Prevent context menu on right click
		canvas.oncontextmenu = e => e.preventDefault();

		window.addEventListener("resize", () => this.resizeCanvas(), false);
    }

	public start(): void {
		this._running = true;

		this.loop();
	}

	public stop(): void {
		if (!this._running)
			return;

		this._running = false;

		if (this._requestFrameId)
			window.cancelAnimationFrame(this._requestFrameId);
	}

	private loop(timestamp: number = 0): void {
		if (!this._running)
			return;

		const delta = (timestamp - this._lastUpdateTime) / 60;

		this.update(delta);
		this.render();

		this._lastUpdateTime = timestamp;

		this._requestFrameId = window.requestAnimationFrame(t => this.loop(t));
    }

	protected resizeCanvas(): void {
		const { innerWidth, innerHeight } = window;

		this._canvas.width = innerWidth;
		this._canvas.height = innerHeight;

		this.resize(innerWidth, innerHeight);
	}

	protected abstract render(): void;
	protected abstract update(delta: number): void;
	protected abstract resize(width: number, height: number): void;
}