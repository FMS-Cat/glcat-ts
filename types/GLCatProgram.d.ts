import { GLCat } from './GLCat';
import { GLCatBuffer } from './GLCatBuffer';
import { GLCatShader } from './GLCatShader';
/**
 * It's a WebGLProgram, but has cache of variable locations.
 */
export declare class GLCatProgram {
    private glCat;
    private program;
    private shaders;
    private attribLocationCache;
    private uniformLocationCache;
    private linked;
    /**
     * Create a new GLCatProgram instance.
     */
    constructor(glCat: GLCat, program: WebGLProgram);
    /**
     * Dispose the program.
     */
    dispose(): void;
    /**
     * Return whether the last link operation was successful or not.
     */
    isLinked(): boolean;
    /**
     * Retrieve its own program.
     */
    getProgram(): WebGLProgram;
    /**
     * Retrieve its shaders.
     */
    getShaders(): GLCatShader[] | null;
    /**
     * Attach shaders and link this program.
     */
    link(...shaders: GLCatShader[]): void;
    /**
     * Attach an attribute variable.
     * @param name Name of the attribute variable
     * @param buffer Vertex buffer. Can be null, to disable attribute array
     * @param size Number of components per vertex. Must be 1, 2, 3 or 4
     */
    attribute(name: string, buffer: GLCatBuffer | null, size?: number, divisor?: number, type?: number, stride?: number, offset?: number): void;
    /**
     * Attach an uniform1i variable.
     */
    uniform1i(name: string, value: number): void;
    /**
     * Attach an uniform2i variable.
     */
    uniform2i(name: string, x: number, y: number): void;
    /**
     * Attach an uniform3i variable.
     */
    uniform3i(name: string, x: number, y: number, z: number): void;
    /**
     * Attach an uniform4i variable.
     */
    uniform4i(name: string, x: number, y: number, z: number, w: number): void;
    /**
     * Attach an uniform1iv variable.
     */
    uniform1iv(name: string, array: Int32List): void;
    /**
     * Attach an uniform2iv variable.
     */
    uniform2iv(name: string, array: Int32List): void;
    /**
     * Attach an uniform3iv variable.
     */
    uniform3iv(name: string, array: Int32List): void;
    /**
     * Attach an uniform4iv variable.
     */
    uniform4iv(name: string, array: Int32List): void;
    /**
     * Attach an uniform1f variable.
     */
    uniform1f(name: string, value: number): void;
    /**
     * Attach an uniform2f variable.
     */
    uniform2f(name: string, x: number, y: number): void;
    /**
     * Attach an uniform3f variable.
     */
    uniform3f(name: string, x: number, y: number, z: number): void;
    /**
     * Attach an uniform4f variable.
     */
    uniform4f(name: string, x: number, y: number, z: number, w: number): void;
    /**
     * Attach an uniform1fv variable.
     */
    uniform1fv(name: string, array: Float32List): void;
    /**
     * Attach an uniform2fv variable.
     */
    uniform2fv(name: string, array: Float32List): void;
    /**
     * Attach an uniform3fv variable.
     */
    uniform3fv(name: string, array: Float32List): void;
    /**
     * Attach an uniform4fv variable.
     */
    uniform4fv(name: string, array: Float32List): void;
    /**
     * Attach an uniformMatrix2fv variable.
     */
    uniformMatrix2fv(name: string, array: Float32List, transpose?: boolean): void;
    /**
     * Attach an uniformMatrix3fv variable.
     */
    uniformMatrix3fv(name: string, array: Float32List, transpose?: boolean): void;
    /**
     * Attach an uniformMatrix4fv variable.
     */
    uniformMatrix4fv(name: string, array: Float32List, transpose?: boolean): void;
    /**
     * Attach a `sampler2D` type uniform texture.
     * @param name Name of the uniform texture
     * @param texture Texture object
     * @param number Specify a texture unit, in integer
     */
    uniformTexture(name: string, texture: WebGLTexture, number?: number): void;
    /**
     * Attach a `samplerCube` type uniform texture.
     * @param name Name of the uniform texture
     * @param texture Texture object
     * @param number Specify a texture unit, in integer
     */
    uniformCubemap(name: string, texture: WebGLTexture, number?: number): void;
    /**
     * Retrieve attribute location.
     */
    getAttribLocation(name: string): number;
    /**
     * Retrieve uniform location.
     */
    getUniformLocation(name: string): WebGLUniformLocation | null;
}
