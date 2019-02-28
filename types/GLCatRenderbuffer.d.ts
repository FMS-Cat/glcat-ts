import { GLCat } from './GLCat';
/**
 * It's a WebGLRenderbuffer.
 */
export declare class GLCatRenderbuffer {
    private __glCat;
    private __renderbuffer;
    private __width;
    private __height;
    /**
     * Create a new GLCatTexture instance.
     */
    constructor(glCat: GLCat, renderbuffer: WebGLRenderbuffer);
    /**
     * Dispose the renderbuffer.
     */
    dispose(): void;
    /**
     * Return its own renderbuffer.
     */
    getRenderbuffer(): WebGLRenderbuffer;
    /**
     * Return its width.
     */
    getWidth(): number;
    /**
     * Return its height.
     */
    getHeight(): number;
    /**
     * Initialize this renderbuffer.
     * If `format` is not given, it will be initialized as `DEPTH_COMPONENT16` .
     */
    init(width: number, height: number, format?: number): void;
}
