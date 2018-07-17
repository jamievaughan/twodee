import { Graphics } from '../Graphics';

export interface Renderer {
	render(graphics: Graphics): void;
	dispose(): void;
}