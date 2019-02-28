import { GLCat } from './GLCat';

/**
 * It's a WebGLShader.
 */
export class GLCatShader {
  private __glCat: GLCat;
  private __shader: WebGLShader;
  private __compiled: boolean = false;

  /**
   * Create a new GLCatShader instance.
   */
  constructor( glCat: GLCat, shader: WebGLShader ) {
    this.__glCat = glCat;
    this.__shader = shader;
  }

  /**
   * Dispose the shader.
   */
  public dispose() {
    this.__glCat.getRenderingContext().deleteShader( this.__shader );
  }

  /**
   * Return whether the last compilation was successful or not.
   */
  public isCompiled() {
    return this.__compiled;
  }

  /**
   * Retrieve its own shader.
   */
  public getShader(): WebGLShader {
    return this.__shader;
  }

  /**
   * Compile the shader.
   */
  public compile( code: string ): void {
    const gl = this.__glCat.getRenderingContext();

    gl.shaderSource( this.__shader, code );
    gl.compileShader( this.__shader );

    this.__compiled = gl.getShaderParameter( this.__shader, gl.COMPILE_STATUS );
    if ( !this.__compiled ) {
      this.__glCat.spit( gl.getShaderInfoLog( this.__shader ) );
    }
  }
}
