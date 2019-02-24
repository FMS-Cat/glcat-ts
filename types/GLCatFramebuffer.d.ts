import { GLCat } from './GLCat';
import { GLCatRenderbuffer } from './GLCatRenderbuffer';
import { GLCatTexture } from './GLCatTexture';
/**
 * It's a WebGLFramebuffer.
 */
export declare class GLCatFramebuffer {
    private glCat;
    private framebuffer;
    private renderbuffer;
    private texture;
    /**
     * Create a new GLCatFramebuffer instance.
     */
    constructor(glCat: GLCat, framebuffer: WebGLFramebuffer);
    /**
     * Dispose the framebuffer.
     */
    dispose(): void;
    /**
     * Return its own framebuffer.
     */
    getFramebuffer(): WebGLFramebuffer;
    /**
     * Return its attached renderbuffer.
     */
    getRenderbuffer(): GLCatRenderbuffer | null;
    /**
     * Return its attached texture.
     */
    getTexture(): GLCatTexture | null;
    /**
     * Attach a renderbuffer to this framebuffer.
     */
    attachRenderbuffer(renderbuffer: GLCatRenderbuffer, attachment?: number): void;
    /**
     * Attach a texture to this framebuffer.
     */
    attachTexture(texture: GLCatTexture, attachment?: number): void;
}
