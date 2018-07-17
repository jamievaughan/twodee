import { Group } from '../Group';
import { Renderer } from './Renderer';
import { Graphics } from '../Graphics';

export class RendererGroup extends Group<Renderer> implements Renderer {
	public render(graphics: Graphics): void {
		for (const entry of this.entries)
			entry.render(graphics);
	}

	public dispose(): void {
		for (const entry of this.entries)
			entry.dispose();
	}
}
