import { KeyCode } from './KeyCode';

export interface KeyboardListener {
	keyDown(keyCode: KeyCode): void;
	keyUp(keyCode: KeyCode): void;
}