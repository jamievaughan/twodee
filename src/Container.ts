import { ControllerGroup } from './controller';
import { RendererGroup } from './renderer';

export class Container {
    public readonly controllers = new ControllerGroup();
    public readonly renderers = new RendererGroup();

    constructor(...containers: Container[]) {
        for (const container of containers)
            this.add(container);
    }

    public add(child: Container): void {
        this.controllers.add(child.controllers);
        this.renderers.add(child.renderers);
    }

    public remove(child: Container): boolean {
        return this.controllers.remove(child.controllers) &&
            this.renderers.remove(child.renderers);
    }

    public dispose(): void {
        this.controllers.dispose();
        this.renderers.dispose();
    }
}