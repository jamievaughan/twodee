import { MouseButton } from './MouseButton';

export interface MouseListener {
	mouseMove(x: number, y: number): void;
	mouseDown(x: number, y: number, button: MouseButton): void;
	mouseUp(x: number, y: number, button: MouseButton): void;
	mouseScroll(amout: number): void;
}