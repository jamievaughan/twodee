import { KeyCode, KeyboardListener } from './keyboard';
import { MouseButton, MouseListener } from './mouse';

export abstract class InputAdapter implements KeyboardListener, MouseListener {
	public keyDown(keyCode: KeyCode): void { }
	public keyUp(keyCode: KeyCode): void { }
	public mouseMove(x: number, y: number): void {	}
	public mouseDown(x: number, y: number, button: MouseButton): void { }
	public mouseUp(x: number, y: number, button: MouseButton): void { }
	public mouseScroll(amount: number): void { }
}