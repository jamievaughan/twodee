// TODO: Remove this
export type Vector = {
    readonly x: number;
    readonly y: number;
}

// TODO: Remove this
export interface Graphics {
    stroke: string;
    fill: string;
    lineWidth: number;

    drawText(text: string, x: number, y: number): void;
    drawRect(x: number, y: number, width: number, height: number): void;
    drawLine(x1: number, y1: number, x2: number, y2: number): void;
    drawVertices(vertices: ReadonlyArray<Vector>): void;
    setSize(width: number, height: number): void;
    clear(color?: string): void;
    dispose(): void;
}