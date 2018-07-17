// TODO: This is just an array?
export abstract class Group<TEntity> {
    private readonly _entries: TEntity[] = [];

    constructor(...entries: TEntity[]) {
        this._entries = entries;
    }

    public add(entry: TEntity): void {
        this._entries.push(entry);
    }

    public remove(entry: TEntity): boolean {
        const index = this._entries.indexOf(entry);
        if (!~index)
            return false;

        this._entries.splice(index, 1);

        return true;
    }

    public get entries(): TEntity[] {
        return this._entries;
    }
}