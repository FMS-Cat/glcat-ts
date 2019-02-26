import GL from './constants';
import { GLCat } from './GLCat';
import { GLCatBuffer } from './GLCatBuffer';
import { GLCatShader } from './GLCatShader';

/**
 * It's a WebGLProgram, but has cache of variable locations.
 */
export class GLCatProgram {
  private glCat: GLCat;
  private program: WebGLProgram;
  private shaders: GLCatShader[] | null = null;
  private attribLocationCache: { [ name: string ]: number } = {};
  private uniformLocationCache: { [ name: string ]: WebGLUniformLocation | null } = {};
  private linked: boolean = false;

  /**
   * Create a new GLCatProgram instance.
   */
  constructor( glCat: GLCat, program: WebGLProgram ) {
    this.glCat = glCat;
    this.program = program;
  }

  /**
   * Dispose the program.
   */
  public dispose() {
    this.glCat.getRenderingContext().deleteProgram( this.program );
  }

  /**
   * Return whether the last link operation was successful or not.
   */
  public isLinked() {
    return this.linked;
  }

  /**
   * Retrieve its own program.
   */
  public getProgram(): WebGLProgram {
    return this.program;
  }

  /**
   * Retrieve its shaders.
   */
  public getShaders(): GLCatShader[] | null {
    return this.shaders ? this.shaders.concat() : null;
  }

  /**
   * Attach shaders and link this program.
   */
  public link( ...shaders: GLCatShader[] ): void {
    const gl = this.glCat.getRenderingContext();

    shaders.forEach( ( shader ) => gl.attachShader( this.program, shader.getShader() ) );
    gl.linkProgram( this.program );

    this.linked = gl.getProgramParameter( this.program, gl.LINK_STATUS );
    if ( !this.linked ) {
      this.glCat.spit( gl.getProgramInfoLog( this.program ) );
      return;
    }

    this.shaders = shaders.concat();
  }

  /**
   * Attach an attribute variable.
   * @param name Name of the attribute variable
   * @param buffer Vertex buffer. Can be null, to disable attribute array
   * @param size Number of components per vertex. Must be 1, 2, 3 or 4
   */
  public attribute(
    name: string,
    buffer: GLCatBuffer | null,
    size: number = 1,
    divisor: number = 0,
    type: number = GL.FLOAT,
    stride = 0,
    offset = 0
  ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getAttribLocation( name );
    if ( location === -1 ) { return; }

    if ( buffer === null ) {
      gl.disableVertexAttribArray( location );
      return;
    }

    gl.bindBuffer( gl.ARRAY_BUFFER, buffer.getBuffer() );
    gl.enableVertexAttribArray( location );
    gl.vertexAttribPointer( location, size, type, false, stride, offset );

    const ext = this.glCat.getExtension( 'ANGLE_instanced_arrays' );
    if ( ext ) {
      ext.vertexAttribDivisorANGLE( location, divisor );
    }

    gl.bindBuffer( gl.ARRAY_BUFFER, null );
  }

  /**
   * Attach an uniform1i variable.
   */
  public uniform1i( name: string, value: number ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform1i( location, value );
  }

  /**
   * Attach an uniform2i variable.
   */
  public uniform2i( name: string, x: number, y: number ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform2i( location, x, y );
  }

  /**
   * Attach an uniform3i variable.
   */
  public uniform3i( name: string, x: number, y: number, z: number ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform3i( location, x, y, z );
  }

  /**
   * Attach an uniform4i variable.
   */
  public uniform4i( name: string, x: number, y: number, z: number, w: number ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform4i( location, x, y, z, w );
  }

  /**
   * Attach an uniform1iv variable.
   */
  public uniform1iv( name: string, array: Int32List ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform1iv( location, array );
  }

  /**
   * Attach an uniform2iv variable.
   */
  public uniform2iv( name: string, array: Int32List ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform2iv( location, array );
  }

  /**
   * Attach an uniform3iv variable.
   */
  public uniform3iv( name: string, array: Int32List ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform3iv( location, array );
  }

  /**
   * Attach an uniform4iv variable.
   */
  public uniform4iv( name: string, array: Int32List ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform4iv( location, array );
  }

  /**
   * Attach an uniform1f variable.
   */
  public uniform1f( name: string, value: number ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform1f( location, value );
  }

  /**
   * Attach an uniform2f variable.
   */
  public uniform2f( name: string, x: number, y: number ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform2f( location, x, y );
  }

  /**
   * Attach an uniform3f variable.
   */
  public uniform3f( name: string, x: number, y: number, z: number ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform3f( location, x, y, z );
  }

  /**
   * Attach an uniform4f variable.
   */
  public uniform4f( name: string, x: number, y: number, z: number, w: number ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform4f( location, x, y, z, w );
  }

  /**
   * Attach an uniform1fv variable.
   */
  public uniform1fv( name: string, array: Float32List ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform1fv( location, array );
  }

  /**
   * Attach an uniform2fv variable.
   */
  public uniform2fv( name: string, array: Float32List ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform2fv( location, array );
  }

  /**
   * Attach an uniform3fv variable.
   */
  public uniform3fv( name: string, array: Float32List ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform3fv( location, array );
  }

  /**
   * Attach an uniform4fv variable.
   */
  public uniform4fv( name: string, array: Float32List ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniform4fv( location, array );
  }

  /**
   * Attach an uniformMatrix2fv variable.
   */
  public uniformMatrix2fv( name: string, array: Float32List, transpose: boolean = false ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniformMatrix2fv( location, transpose, array );
  }

  /**
   * Attach an uniformMatrix3fv variable.
   */
  public uniformMatrix3fv( name: string, array: Float32List, transpose: boolean = false ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniformMatrix3fv( location, transpose, array );
  }

  /**
   * Attach an uniformMatrix4fv variable.
   */
  public uniformMatrix4fv( name: string, array: Float32List, transpose: boolean = false ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.uniformMatrix4fv( location, transpose, array );
  }

  /**
   * Attach a `sampler2D` type uniform texture.
   * @param name Name of the uniform texture
   * @param texture Texture object
   * @param number Specify a texture unit, in integer
   */
  public uniformTexture( name: string, texture: WebGLTexture | null, number: number = 0 ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.activeTexture( gl.TEXTURE0 + number );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.uniform1i( location, number );
  }

  /**
   * Attach a `samplerCube` type uniform texture.
   * @param name Name of the uniform texture
   * @param texture Texture object
   * @param number Specify a texture unit, in integer
   */
  public uniformCubemap( name: string, texture: WebGLTexture | null, number: number = 0 ): void {
    const gl = this.glCat.getRenderingContext();

    const location = this.getUniformLocation( name );
    gl.activeTexture( gl.TEXTURE0 + number );
    gl.bindTexture( gl.TEXTURE_CUBE_MAP, texture );
    gl.uniform1i( location, number );
  }

  /**
   * Retrieve attribute location.
   */
  public getAttribLocation( name: string ): number {
    const gl =  this.glCat.getRenderingContext();

    if ( this.attribLocationCache[ name ] !== undefined ) {
      return this.attribLocationCache[ name ];
    } else {
      const location = gl.getAttribLocation( this.program, name );
      // if ( location === -1 ) {
      //   this.glCat.spit( 'GLCatProgram.getAttribLocation: Could not retrieve attribute location' );
      //   return -1;
      // }
      this.attribLocationCache[ name ] = location;
      return location;
    }
  }

  /**
   * Retrieve uniform location.
   */
  public getUniformLocation( name: string ): WebGLUniformLocation | null {
    const gl = this.glCat.getRenderingContext();

    if ( this.uniformLocationCache[ name ] !== undefined ) {
      return this.uniformLocationCache[ name ];
    } else {
      const location = gl.getUniformLocation( this.program, name );
      // if ( location === null ) {
      //   this.glCat.spit( 'GLCatProgram.getUniformLocation: Could not retrieve uniform location' );
      //   return location;
      // }
      this.uniformLocationCache[ name ] = location;
      return location;
    }
  }
}
