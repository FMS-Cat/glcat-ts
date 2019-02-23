import { GLCat } from './GLCat';
/**
 * It's a WebGLRenderbuffer.
 */
export declare class GLCatRenderbuffer {
    private glCat;
    private renderbuffer;
    /**
     * Create a new GLCatTexture instance.
     */
    constructor(glCat: GLCat, renderbuffer: WebGLRenderbuffer);
    /**
     * Return its own renderbuffer.
     */
    getRenderbuffer(): WebGLRenderbuffer;
    /**
     * Initialize this renderbuffer.
     * If `format` is not given, it will be initialized as `DEPTH_COMPONENT16` .
     */
    init(width: number, height: number, format?: number): void;
}
