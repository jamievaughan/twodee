import { Group } from '../Group';
import { Controller } from './Controller';

export class ControllerGroup extends Group<Controller> implements Controller {
	public update(delta: number): void {
		for (const entry of this.entries)
			entry.update(delta);
	}

	public dispose(): void {
		for (const entry of this.entries)
			entry.dispose();
	}
}