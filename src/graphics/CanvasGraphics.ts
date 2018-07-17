import { Graphics } from './Graphics';

// TODO: Remove this
export type Vector = {
    readonly x: number;
    readonly y: number;
}

// TODO: Remove this
export class CanvasGraphics implements Graphics {
    private readonly _context: CanvasRenderingContext2D;

    private _width: number = 0;
    private _height: number = 0;

    constructor(context: HTMLCanvasElement | CanvasRenderingContext2D | null) {
        if (context instanceof HTMLCanvasElement)
            context = context.getContext("2d");

        if (!context)
            throw new Error("Rendering context cannot be null");

        this._context = context;
    }

    public drawText(text: string, x: number, y: number): void {
        this._context.fillText(text, x, y);
    }
    
    public drawRect(x: number, y: number, width: number, height: number): void {
        if (width < 0 || height < 0)
            return;
        
        this._context.strokeRect(x, y, width, height);
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number): void {
        this._context.save();
        this._context.beginPath();

        this._context.moveTo(x1, y1);
        this._context.lineTo(x2, y2);

        this._context.stroke();
        this._context.restore();
    }

    public drawVertices(vertices: ReadonlyArray<Vector>): void {
        const first = vertices[0];

        this._context.save();

        // Translate the context to the first vertex
        this._context.moveTo(first.x, first.y);

        this._context.beginPath();

        for (let i = 0; i < vertices.length; i++) {
            const vertex = vertices[i + 1] || first;

            this._context.lineTo(vertex.x, vertex.y);
        }

        this._context.closePath();
        this._context.stroke();

        this._context.restore();
    }

    public setSize(width: number, height: number): void {
        this._width = width;
        this._height = height;
    }

    public clear(color: string = '#FFFFFF'): void {
        this.fill = color;
        
        this._context.fillRect(0 ,0, this._width, this._height);
    }

    public dispose(): void {
    }

    public set stroke(stroke: string) {
        this._context.strokeStyle = stroke;
    }

    public set fill(fill: string) {
        this._context.fillStyle = fill;
    }

    public set lineWidth(lineWidth: number) {
        this._context.lineWidth = lineWidth;
    }
}