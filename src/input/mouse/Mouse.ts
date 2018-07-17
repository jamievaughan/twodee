import { MouseButton } from './MouseButton';
import { MouseListener } from './MouseListener';

export class Mouse {
	private static readonly _buttons: { [button: number]: boolean } = { };
	private static readonly _location: { x: number, y: number } = { x: 0, y: 0 };

	private readonly _listeners: MouseListener[] = [];

	constructor(container: HTMLElement) {
		container.addEventListener('mousemove', e => this.mouseMove(e));
		container.addEventListener('mousedown', e => this.mouseDown(e));
		container.addEventListener('mouseup', e => this.mouseUp(e));
		container.addEventListener('mousewheel', e => this.mouseScroll(e));
	}

	public addListener(listener: MouseListener): void {
		this._listeners.push(listener);
	}

	public removeListener(listener: MouseListener): boolean {
		const index = this._listeners.indexOf(listener);
		if (!~index)
			return false;

		this._listeners.splice(index, 1);

		return true;
	}

	private mouseMove(event: MouseEvent): void {
		const { clientX, clientY } = event;

		this.setLocation(clientX, clientY);

		for (const listener of this._listeners)
			listener.mouseMove(clientX, clientY);
	}

	private mouseDown(event: MouseEvent): void {
		const { clientX, clientY, button } = event;

		this.buttonState(button, true);

		for (const listener of this._listeners)
			listener.mouseDown(clientX, clientY, button);
	}

	private mouseUp(event: MouseEvent): void {
		const { clientX, clientY, button } = event;

		this.buttonState(button, false);

		for (const listener of this._listeners)
			listener.mouseUp(clientX, clientY, button);
	}

	public mouseScroll(event: WheelEvent): void {
		const { wheelDelta } = event;

		for (const listener of this._listeners)
			listener.mouseScroll(wheelDelta);
	}

	private setLocation(x: number, y: number): void {
		Mouse._location.x = x;
		Mouse._location.y = y;
	}

	private buttonState(button: MouseButton, state: boolean): void {
		Mouse._buttons[button] = state;
	}

	public static isButtonDown(button: MouseButton): boolean {
		return Mouse._buttons[button];
	}

	public static get x(): number {
		return Mouse._location.x;
	}

	public static get y(): number {
		return Mouse._location.y;
	}

	public static get location(): { x: number, y: number} {
		return Mouse._location;
	}
}
