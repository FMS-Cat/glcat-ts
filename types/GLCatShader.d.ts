import { GLCat } from './GLCat';
/**
 * It's a WebGLShader.
 */
export declare class GLCatShader {
    private glCat;
    private shader;
    private compiled;
    /**
     * Create a new GLCatShader instance.
     */
    constructor(glCat: GLCat, shader: WebGLShader);
    /**
     * Dispose the shader.
     */
    dispose(): void;
    /**
     * Return whether the last compilation was successful or not.
     */
    isCompiled(): boolean;
    /**
     * Retrieve its own shader.
     */
    getShader(): WebGLShader;
    /**
     * Compile the shader.
     */
    compile(code: string): void;
}
