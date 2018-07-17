import { KeyCode } from './KeyCode';
import { KeyboardListener } from './KeyboardListener';

export abstract class KeyboardAdapter implements KeyboardListener {    
	public keyDown(keyCode: KeyCode): void { }
	public keyUp(keyCode: KeyCode): void { }
}