import { GL_COMPLETION_STATUS_KHR, GL_FLOAT, GL_LINK_STATUS, GL_TEXTURE0 } from './GLConstants';
import type { GLCat } from './GLCat';
import type { GLCatBuffer } from './GLCatBuffer';
import type { GLCatShader } from './GLCatShader';
import type { GLCatTexture } from './GLCatTexture';

export type GLCatProgramUniformType =
  '1f' | '2f' | '3f' | '4f' |
  '1i' | '2i' | '3i' | '4i' |
  '1fv' | '2fv' | '3fv' | '4fv' |
  '1iv' | '2iv' | '3iv' | '4iv' |
  'Matrix2fv' | 'Matrix3fv' | 'Matrix4fv';

/**
 * It's a WebGLProgram, but has cache of variable locations.
 */
export class GLCatProgram<TContext extends WebGLRenderingContext | WebGL2RenderingContext> {
  private __glCat: GLCat<TContext>;
  private __program: WebGLProgram;
  private __shaders: GLCatShader<TContext>[] | null = null;
  private __attribLocationCache: { [ name: string ]: number } = {};
  private __uniformLocationCache: { [ name: string ]: WebGLUniformLocation | null } = {};
  private __uniformTextureUnitMap: { [ name: string ]: number } = {};
  private __uniformtextureUnitIndex = 0;
  private __linked = false;

  /**
   * Its own program.
   */
  public get program(): WebGLProgram {
    return this.__program;
  }

  /**
   * Its own program. Shorter than [[GLCatProgram.program]].
   */
  public get raw(): WebGLProgram {
    return this.__program;
  }

  /**
   * Its shaders.
   */
  public get shaders(): GLCatShader<TContext>[] | null {
    return this.__shaders ? this.__shaders.concat() : null;
  }

  /**
   * Whether the last link operation was successful or not.
   */
  public get isLinked(): boolean {
    return this.__linked;
  }

  /**
   * Create a new GLCatProgram instance.
   */
  public constructor( glCat: GLCat<TContext>, program: WebGLProgram ) {
    this.__glCat = glCat;
    this.__program = program;
  }

  /**
   * Dispose the program.
   */
  public dispose( alsoAttached = false ): void {
    const { gl } = this.__glCat;

    gl.deleteProgram( this.__program );

    if ( alsoAttached ) {
      const shaders = this.shaders;
      if ( shaders ) {
        shaders.forEach( ( shader ) => {
          shader.dispose();
        } );
      }
    }
  }

  /**
   * Attach shaders and link this program.
   */
  public link( ...shaders: GLCatShader<TContext>[] ): void {
    const { gl } = this.__glCat;

    shaders.forEach( ( shader ) => gl.attachShader( this.__program, shader.raw ) );
    gl.linkProgram( this.__program );

    this.__linked = gl.getProgramParameter( this.__program, GL_LINK_STATUS );
    if ( !this.__linked ) {
      throw new Error( gl.getProgramInfoLog( this.__program )! );
    }

    this.__shaders = shaders.concat();
  }

  /**
   * Attach shaders and link this program.
   * It's gonna be asynchronous if you have the KHR_parallel_shader_compile extension support.
   */
  public linkAsync( ...shaders: GLCatShader<TContext>[] ): Promise<void> {
    const glCat = this.__glCat;
    const { gl } = this.__glCat;
    const extParallel = glCat.getExtension( 'KHR_parallel_shader_compile' );

    shaders.forEach( ( shader ) => gl.attachShader( this.__program, shader.raw ) );
    gl.linkProgram( this.__program );

    return new Promise( ( resolve, reject ) => {
      const update = (): void => {
        if (
          !extParallel ||
          gl.getProgramParameter( this.__program, GL_COMPLETION_STATUS_KHR ) === true
        ) {
          this.__linked = gl.getProgramParameter( this.__program, GL_LINK_STATUS );
          if ( !this.__linked ) {
            reject( gl.getProgramInfoLog( this.__program ) );
            return;
          }

          this.__shaders = shaders.concat();
          resolve();
          return;
        }

        requestAnimationFrame( update );
      };
      update();
    } );
  }

  /**
   * Attach an attribute variable.
   * @param name Name of the attribute variable
   * @param buffer Vertex buffer. Can be null, to disable attribute array
   * @param size Number of components per vertex. Must be 1, 2, 3 or 4
   */
  public attribute(
    name: string,
    buffer: GLCatBuffer<TContext> | null,
    size = 1,
    divisor = 0,
    type: number = GL_FLOAT,
    stride = 0,
    offset = 0
  ): void {
    const { gl } = this.__glCat;

    const location = this.getAttribLocation( name );
    if ( location === -1 ) { return; }

    if ( buffer === null ) {
      gl.disableVertexAttribArray( location );
      return;
    }

    this.__glCat.bindVertexBuffer( buffer, () => {
      gl.enableVertexAttribArray( location );
      gl.vertexAttribPointer( location, size, type, false, stride, offset );

      if ( gl instanceof WebGL2RenderingContext ) {
        gl.vertexAttribDivisor( location, divisor );
      } else {
        const ext = this.__glCat.getExtension( 'ANGLE_instanced_arrays' );
        if ( ext ) {
          ext.vertexAttribDivisorANGLE( location, divisor );
        }
      }
    } );
  }

  /**
   * Attach an uniform variable.
   * See also: [[GLCatProgram.uniformVector]]
   */
  public uniform( name: string, type: GLCatProgramUniformType, ...value: number[] ): void {
    const func = ( this as any )[ 'uniform' + type ];
    func.call( this, name, ...value );
  }

  /**
   * Attach an uniform variable.
   * See also: [[GLCatProgram.uniform]]
   */
  public uniformVector(
    name: string,
    type: GLCatProgramUniformType,
    value: Float32List | Int32List
  ): void {
    const func = ( this as any )[ 'uniform' + type ];
    func.call( this, name, value );
  }

  /**
   * Attach an uniform1i variable.
   */
  public uniform1i( name: string, value: number ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform1i( location, value );
    } );
  }

  /**
   * Attach an uniform2i variable.
   */
  public uniform2i( name: string, x: number, y: number ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform2i( location, x, y );
    } );
  }

  /**
   * Attach an uniform3i variable.
   */
  public uniform3i( name: string, x: number, y: number, z: number ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform3i( location, x, y, z );
    } );
  }

  /**
   * Attach an uniform4i variable.
   */
  public uniform4i( name: string, x: number, y: number, z: number, w: number ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform4i( location, x, y, z, w );
    } );
  }

  /**
   * Attach an uniform1iv variable.
   */
  public uniform1iv( name: string, array: Int32List ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform1iv( location, array );
    } );
  }

  /**
   * Attach an uniform2iv variable.
   */
  public uniform2iv( name: string, array: Int32List ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform2iv( location, array );
    } );
  }

  /**
   * Attach an uniform3iv variable.
   */
  public uniform3iv( name: string, array: Int32List ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform3iv( location, array );
    } );
  }

  /**
   * Attach an uniform4iv variable.
   */
  public uniform4iv( name: string, array: Int32List ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform4iv( location, array );
    } );
  }

  /**
   * Attach an uniform1f variable.
   */
  public uniform1f( name: string, value: number ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform1f( location, value );
    } );
  }

  /**
   * Attach an uniform2f variable.
   */
  public uniform2f( name: string, x: number, y: number ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform2f( location, x, y );
    } );
  }

  /**
   * Attach an uniform3f variable.
   */
  public uniform3f( name: string, x: number, y: number, z: number ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform3f( location, x, y, z );
    } );
  }

  /**
   * Attach an uniform4f variable.
   */
  public uniform4f( name: string, x: number, y: number, z: number, w: number ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform4f( location, x, y, z, w );
    } );
  }

  /**
   * Attach an uniform1fv variable.
   */
  public uniform1fv( name: string, array: Float32List ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform1fv( location, array );
    } );
  }

  /**
   * Attach an uniform2fv variable.
   */
  public uniform2fv( name: string, array: Float32List ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform2fv( location, array );
    } );
  }

  /**
   * Attach an uniform3fv variable.
   */
  public uniform3fv( name: string, array: Float32List ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform3fv( location, array );
    } );
  }

  /**
   * Attach an uniform4fv variable.
   */
  public uniform4fv( name: string, array: Float32List ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniform4fv( location, array );
    } );
  }

  /**
   * Attach an uniformMatrix2fv variable.
   */
  public uniformMatrix2fv( name: string, array: Float32List, transpose = false ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniformMatrix2fv( location, transpose, array );
    } );
  }

  /**
   * Attach an uniformMatrix3fv variable.
   */
  public uniformMatrix3fv( name: string, array: Float32List, transpose = false ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniformMatrix3fv( location, transpose, array );
    } );
  }

  /**
   * Attach an uniformMatrix4fv variable.
   */
  public uniformMatrix4fv( name: string, array: Float32List, transpose = false ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    this.__glCat.useProgram( this, () => {
      gl.uniformMatrix4fv( location, transpose, array );
    } );
  }

  /**
   * Attach a `sampler2D` type uniform texture.
   * @param name Name of the uniform texture
   * @param texture Texture object
   */
  public uniformTexture( name: string, texture: GLCatTexture<TContext> | null ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    const unit = this.getUniformTextureUnit( name );
    gl.activeTexture( GL_TEXTURE0 + unit );
    this.__glCat.bindTexture2D( texture ?? null );
    this.__glCat.useProgram( this, () => {
      gl.uniform1i( location, unit );
    } );
  }

  /**
   * Attach a `samplerCube` type uniform texture.
   * @param name Name of the uniform texture
   * @param texture Texture object
   */
  public uniformCubemap( name: string, texture: GLCatTexture<TContext> | null ): void {
    const { gl } = this.__glCat;

    const location = this.getUniformLocation( name );
    const unit = this.getUniformTextureUnit( name );
    gl.activeTexture( GL_TEXTURE0 + unit );
    this.__glCat.bindTextureCubeMap( texture ?? null );
    this.__glCat.useProgram( this, () => {
      gl.uniform1i( location, unit );
    } );
  }

  /**
   * Retrieve attribute location.
   */
  public getAttribLocation( name: string ): number {
    const { gl } = this.__glCat;

    if ( this.__attribLocationCache[ name ] !== undefined ) {
      return this.__attribLocationCache[ name ];
    } else {
      const location = gl.getAttribLocation( this.__program, name );
      // if ( location === -1 ) {
      //   this.glCat.spit( 'GLCatProgram.getAttribLocation: Could not retrieve attribute location' );
      //   return -1;
      // }
      this.__attribLocationCache[ name ] = location;
      return location;
    }
  }

  /**
   * Retrieve uniform location.
   */
  public getUniformLocation( name: string ): WebGLUniformLocation | null {
    const { gl } = this.__glCat;

    if ( this.__uniformLocationCache[ name ] !== undefined ) {
      return this.__uniformLocationCache[ name ];
    } else {
      const location = gl.getUniformLocation( this.__program, name );
      // if ( location === null ) {
      //   this.glCat.spit( 'GLCatProgram.getUniformLocation: Could not retrieve uniform location' );
      //   return location;
      // }
      this.__uniformLocationCache[ name ] = location;
      return location;
    }
  }

  /**
   * Retrieve or create a texture unit that corresponds to given name.
   */
  public getUniformTextureUnit( name: string ): number {
    if ( this.__uniformTextureUnitMap[ name ] === undefined ) {
      this.__uniformTextureUnitMap[ name ] = this.__uniformtextureUnitIndex;
      this.__uniformtextureUnitIndex ++;
    }

    return this.__uniformTextureUnitMap[ name ];
  }
}
