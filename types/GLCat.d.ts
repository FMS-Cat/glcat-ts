import { EventEmitter } from 'eventemitter3';
import { GLCatBuffer } from './GLCatBuffer';
import { GLCatFramebuffer } from './GLCatFramebuffer';
import { GLCatProgram } from './GLCatProgram';
import { GLCatRenderbuffer } from './GLCatRenderbuffer';
import { GLCatShader } from './GLCatShader';
import { GLCatTexture } from './GLCatTexture';
export declare type WebGLExtension = any;
/**
 * WebGL wrapper with plenty of hackability.
 */
export declare class GLCat extends EventEmitter {
    static unexpectedNullDetectedError: Error;
    private __gl;
    private __extensionCache;
    private __dummyTextureCache?;
    /**
     * Create a new GLCat instance.
     * WebGLRenderingContext is required.
     */
    constructor(gl: WebGLRenderingContext);
    /**
     * It's... just an `emit( 'error', ...args )`.
     * But, if there are no listeners subscribed to 'error' event,
     * it will throw an error instead. What a cool!
     */
    spit(error?: Error | string | null): void;
    /**
     * Return its own WebGLRenderingContext.
     */
    getRenderingContext(): WebGLRenderingContext;
    /**
     * Retrieve an extension.
     * If they is your precious one and you cannot live without him, turn on `throwIfNotFound`.
     */
    getExtension(name: string, throwIfNotFound?: boolean): WebGLExtension | null;
    /**
     * Retrieve extensions.
     * If they are your precious ones and you cannot live without them, turn on `throwIfNotFound`.
     */
    getExtensions(names: string[], throwIfNotFound?: boolean): Array<WebGLExtension | null>;
    /**
     * Create a new shader object.
     */
    createShader(type: number): GLCatShader | null;
    /**
     * Create a new GLCat program object.
     */
    createProgram(): GLCatProgram | null;
    /**
     * Create a new GLCat program object, in lazier way.
     */
    lazyProgram(vert: string, frag: string): GLCatProgram | null;
    /**
     * Specify a program to use.
     */
    useProgram(program: GLCatProgram | null): void;
    /**
     * Create a new vertex buffer.
     */
    createBuffer(): GLCatBuffer | null;
    /**
     * Create a new texture.
     */
    createTexture(): GLCatTexture | null;
    /**
     * Create/retrieve a dummy texture, 100% organic pure #FF00FF texture.
     */
    getDummyTexture(): GLCatTexture | null;
    /**
     * Create a new renderbuffer.
     */
    createRenderbuffer(): GLCatRenderbuffer | null;
    /**
     * Create a new framebuffer.
     * TODO: DrawBuffers
     */
    createFramebuffer(): GLCatFramebuffer | null;
    /**
     * Create a new framebufer, in lazier way.
     */
    lazyFramebuffer(width: number, height: number, isFloat?: boolean): GLCatFramebuffer | null;
    /**
     * Create a new draw buffers, in lazier way.
     * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
     */
    lazyDrawbuffers(width: number, height: number, numBuffers: number, isFloat?: boolean): GLCatFramebuffer | null;
    /**
     * Call this before you're gonna use draw buffers.
     * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
     */
    drawBuffers(numBuffers: number[] | number): void;
    /**
     * Clear the current framebuffer.
     */
    clear(red?: number, green?: number, blue?: number, alpha?: number, depth?: number): void;
}
