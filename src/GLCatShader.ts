import { GLCat } from './GLCat';

/**
 * It's a WebGLShader.
 */
export class GLCatShader {
  private glCat: GLCat;
  private shader: WebGLShader;
  private compiled: boolean = false;

  /**
   * Create a new GLCatShader instance.
   */
  constructor( glCat: GLCat, shader: WebGLShader ) {
    this.glCat = glCat;
    this.shader = shader;
  }

  /**
   * Dispose the shader.
   */
  public dispose() {
    this.glCat.getRenderingContext().deleteShader( this.shader );
  }

  /**
   * Return whether the last compilation was successful or not.
   */
  public isCompiled() {
    return this.compiled;
  }

  /**
   * Retrieve its own shader.
   */
  public getShader(): WebGLShader {
    return this.shader;
  }

  /**
   * Compile the shader.
   */
  public compile( code: string ): void {
    const gl = this.glCat.getRenderingContext();

    gl.shaderSource( this.shader, code );
    gl.compileShader( this.shader );

    this.compiled = gl.getShaderParameter( this.shader, gl.COMPILE_STATUS );
    if ( !this.compiled ) {
      this.glCat.spit( gl.getShaderInfoLog( this.shader ) );
    }
  }
}
