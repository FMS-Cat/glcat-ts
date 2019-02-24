import { GLCat } from './GLCat';
/**
 * It's a WebGLBuffer.
 */
export declare class GLCatBuffer {
    private glCat;
    private buffer;
    /**
     * Create a new GLCatBuffer instance.
     */
    constructor(glCat: GLCat, buffer: WebGLBuffer);
    /**
     * Dispose the buffer.
     */
    dispose(): void;
    /**
     * Retrieve its own buffer.
     */
    getBuffer(): WebGLBuffer;
    /**
     * Set new data into this buffer.
     */
    setVertexbuffer(source: ArrayBuffer | ArrayBufferView | null, usage?: number): void;
    /**
     * Set new index data into this buffer.
     */
    setIndexbuffer(source: ArrayBuffer | ArrayBufferView | null, usage?: number): void;
}
