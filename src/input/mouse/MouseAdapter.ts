import { MouseButton } from './MouseButton';
import { MouseListener } from './MouseListener';

export abstract class MouseAdapter implements MouseListener {
	public mouseMove(x: number, y: number): void { }
	public mouseDown(x: number, y: number, button: MouseButton): void { }
	public mouseUp(x: number, y: number, button: MouseButton): void { }
	public mouseScroll(amount: number): void { }
}