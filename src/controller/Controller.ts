export interface Controller {
	update(delta: number): void;
	dispose(): void;
}