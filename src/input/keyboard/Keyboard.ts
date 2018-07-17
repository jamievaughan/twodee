import { KeyCode } from './KeyCode';
import { KeyboardListener } from './KeyboardListener';

export class Keyboard {
	private static readonly _keys: { [keycode: number]: boolean } = { };

	private readonly _listeners: KeyboardListener[] = [];

	constructor(container: HTMLElement) {
		container.addEventListener('keydown', e => this.keyDown(e));
		container.addEventListener('keyup', e => this.keyUp(e));
	}

	public addListener(listener: KeyboardListener): void {
		this._listeners.push(listener);
	}

	public removeListener(listener: KeyboardListener): boolean {
		const index = this._listeners.indexOf(listener);
		if (!~index)
			return false;

		this._listeners.splice(index, 1);

		return true;
	}

	private keyDown(event: KeyboardEvent): void {
		event.preventDefault();

		this.keyState(event.keyCode, true);

		for (const listener of this._listeners)
			listener.keyDown(event.keyCode);
	}

	private keyUp(event: KeyboardEvent): void {
		this.keyState(event.keyCode, false);

		for (const listener of this._listeners)
			listener.keyUp(event.keyCode);
	}

	private keyState(keyCode: KeyCode, state: boolean): void {
		Keyboard._keys[keyCode] = state;
	}

	public static isKeyDown(keyCode: KeyCode): boolean {
		return this._keys[keyCode];
	}
}