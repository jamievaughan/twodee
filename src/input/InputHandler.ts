import {
    InputMultiplexer,
    KeyboardAdapter,
    MouseAdapter,
    InputAdapter
} from '../input';

import { Group } from '../Group';

type Adapter = KeyboardAdapter | MouseAdapter | InputAdapter;

export class InputHandler<TEntity> {
    private readonly _multiplexer: InputMultiplexer;

    constructor(multiplexer: InputMultiplexer) {
        this._multiplexer = multiplexer;
    }

    public add(entity: TEntity): void {
        this.recursiveAction(entity,
            adapter => this._multiplexer.addAdapter(adapter));
    }

    public remove(entity: TEntity): void {
        this.recursiveAction(entity,
            adapter => this._multiplexer.removeAdapter(adapter));
    }

    private recursiveAction(entity: TEntity, action: (adapter: Adapter) => void): void {
        if (entity instanceof KeyboardAdapter ||
            entity instanceof MouseAdapter ||
            entity instanceof InputAdapter)
            action(entity);

        if (!(entity instanceof Group))
            return;

        for (const entry of entity.entries)
            this.recursiveAction(entry, action);
    }
}