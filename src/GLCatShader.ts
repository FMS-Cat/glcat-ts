import type { GLCat } from './GLCat';
import { GL_COMPILE_STATUS } from './GLConstants';

type WebGL1 = WebGLRenderingContext;
type WebGL2 = WebGL2RenderingContext;

/**
 * It's a WebGLShader.
 */
export class GLCatShader<TContext extends WebGL1 | WebGL2 = WebGL1 | WebGL2> {
  private __glCat: GLCat<TContext>;
  private __shader: WebGLShader;
  private __compiled = false;

  /**
   * Its own shader.
   */
  public get shader(): WebGLShader {
    return this.__shader;
  }

  /**
   * Its own shader. Shorter than [[GLCatShader.shader]].
   */
  public get raw(): WebGLShader {
    return this.__shader;
  }

  /**
   * Create a new GLCatShader instance.
   */
  public constructor( glCat: GLCat<TContext>, shader: WebGLShader ) {
    this.__glCat = glCat;
    this.__shader = shader;
  }

  /**
   * Dispose the shader.
   */
  public dispose(): void {
    this.__glCat.gl.deleteShader( this.__shader );
  }

  /**
   * Return whether the last compilation was successful or not.
   */
  public isCompiled(): boolean {
    return this.__compiled;
  }

  /**
   * Compile the shader.
   */
  public compile( code: string ): void {
    const { gl } = this.__glCat;

    gl.shaderSource( this.__shader, code );
    gl.compileShader( this.__shader );

    this.__compiled = gl.getShaderParameter( this.__shader, GL_COMPILE_STATUS );
    if ( !this.__compiled ) {
      throw new Error( gl.getShaderInfoLog( this.__shader )! );
    }
  }
}
