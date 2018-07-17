import { ApplicationEngine } from './ApplicationEngine';
import { Graphics, CanvasGraphics } from './graphics';
import { Container } from './Container';
import { Controller } from './controller';
import { Renderer } from './renderer';
import { InputMultiplexer, InputHandler } from './input';

export class Application extends ApplicationEngine {
	private readonly _graphics: Graphics;
	private readonly _input: InputHandler<Controller>;

	private _root: Container | undefined;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);

		this._graphics = new CanvasGraphics(canvas);

		const multiplexer = new InputMultiplexer(canvas);
		this._input = new InputHandler<Controller | Renderer>(multiplexer);
	}

	protected render(): void {
		if (this._root)
			this._root.renderers.render(this._graphics);
	}

	protected update(delta: number): void {
		if (this._root)
			this._root.controllers.update(delta);
	}

	protected resize(width: number, height: number): void {
		this._graphics.setSize(width, height);
	}

	public dispose(): void {
		super.stop();

		if (this._root)
			this._root.dispose();

		if (this._graphics)
			this._graphics.dispose();
	}

	public set root(root: Container) {
		if (this._root) {
			this._input.remove(this._root.controllers);

			this._root.dispose();
		}

		this._root = root;

		this._input.add(root.controllers);

		// Force the canvas to resize
		super.resizeCanvas();
	}
}
