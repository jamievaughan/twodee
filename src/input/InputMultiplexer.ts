import { Keyboard, KeyboardListener, KeyboardAdapter } from './keyboard';
import { Mouse, MouseListener, MouseAdapter } from './mouse';
import { InputAdapter } from './InputAdapter';

export type Adapter = KeyboardAdapter | MouseAdapter | InputAdapter;

export class InputMultiplexer {
	private readonly _keyboard: Keyboard;
	private readonly _mouse: Mouse;

	constructor(container: HTMLElement) {
		this._keyboard = new Keyboard(container);
		this._mouse = new Mouse(container);
	}

	public addAdapter(adapter: Adapter): void {
		if (adapter instanceof KeyboardAdapter || adapter instanceof InputAdapter)
			this.addKeyboardListener(adapter);
		
		if (adapter instanceof MouseAdapter || adapter instanceof InputAdapter)
			this.addMouseListener(adapter);
	}

	public removeAdapter(adapter: Adapter): void {
		if (adapter instanceof KeyboardAdapter || adapter instanceof InputAdapter)
			this.removeKeyboardListener(adapter);
		
		if (adapter instanceof MouseAdapter || adapter instanceof InputAdapter)
			this.removeMouseListener(adapter);
	}

	public addKeyboardListener(listener: KeyboardListener): void {
		this._keyboard.addListener(listener);
	}

	public removeKeyboardListener(listener: KeyboardListener): boolean {
		return this._keyboard.removeListener(listener);
	}

	public addMouseListener(listener: MouseListener): void {
		this._mouse.addListener(listener);
	}

	public removeMouseListener(listener: MouseListener): boolean {
		return this._mouse.removeListener(listener);
	}
}
