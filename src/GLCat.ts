import { GLCatBuffer } from './GLCatBuffer';
import { GLCatFramebuffer } from './GLCatFramebuffer';
import { GLCatProgram } from './GLCatProgram';
import { GLCatRenderbuffer } from './GLCatRenderbuffer';
import { GLCatShader } from './GLCatShader';
import { GLCatTexture } from './GLCatTexture';
import { GLCatVertexArray } from './GLCatVertexArray';

export type WebGLExtension = any;

/**
 * WebGL wrapper with plenty of hackability.
 */
export class GLCat<TContext extends WebGLRenderingContext | WebGL2RenderingContext> {
  public static unexpectedNullDetectedError = 'GLCat: Unexpected null detected';

  private __gl: TContext;
  private __extensionCache: { [ name: string ]: WebGLExtension } = {};
  private __dummyTextureCache?: GLCatTexture<TContext>;

  /**
   * Its own rendering context.
   */
  public get renderingContext(): TContext {
    return this.__gl;
  }

  /**
   * Its own rendering context. Shorter than [[GLCat.renderingContext]]
   */
  public get gl(): TContext {
    return this.__gl;
  }

  /**
   * Create a new GLCat instance.
   * Rendering context is required.
   */
  public constructor( gl: TContext ) {
    this.__gl = gl;

    gl.enable( gl.DEPTH_TEST );
    gl.depthFunc( gl.LEQUAL );
    gl.enable( gl.BLEND );
    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
  }

  /**
   * A dummy texture, 100% organic pure #FF00FF texture.
   */
  public get dummyTexture(): GLCatTexture<TContext> {
    if ( this.__dummyTextureCache ) {
      return this.__dummyTextureCache;
    }

    const texture = this.createTexture();
    if ( texture === null ) {
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    texture.setTextureFromArray( 1, 1, new Uint8Array( [ 255, 0, 255, 255 ] ) );
    this.__dummyTextureCache = texture;
    return texture;
  }

  /**
   * Retrieve an extension.
   * If they is your precious one and you cannot live without him, turn on `throwIfNotFound`.
   */
  public getExtension(
    name: 'ANGLE_instanced_arrays',
    throwIfNotFound?: false
  ): ANGLE_instanced_arrays | null; // eslint-disable-line @typescript-eslint/camelcase
  public getExtension(
    name: 'ANGLE_instanced_arrays',
    throwIfNotFound: true
  ): ANGLE_instanced_arrays; // eslint-disable-line @typescript-eslint/camelcase
  public getExtension( name: string, throwIfNotFound?: boolean ): WebGLExtension | null;
  public getExtension( name: string, throwIfNotFound?: boolean ): WebGLExtension | null {
    const gl = this.__gl;

    if ( this.__extensionCache[ name ] ) {
      return this.__extensionCache[ name ];
    } else {
      this.__extensionCache[ name ] = gl.getExtension( name );
      if ( this.__extensionCache[ name ] ) {
        return this.__extensionCache[ name ];
      } else {
        if ( throwIfNotFound ) {
          throw new Error( 'GLCat.getExtension: The extension "' + name + '" is not supported' );
        }
        return null;
      }
    }
  }

  /**
   * Retrieve extensions.
   * If they are your precious ones and you cannot live without them, turn on `throwIfNotFound`.
   */
  public getExtensions( names: string[], throwIfNotFound?: boolean ): Array<WebGLExtension | null> {
    return names.map( ( n ) => this.getExtension( n, throwIfNotFound ) );
  }

  /**
   * Create a new shader object.
   */
  public createShader( type: number ): GLCatShader<TContext> {
    const gl = this.__gl;

    const shader = gl.createShader( type );
    if ( shader === null ) {
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    return new GLCatShader( this, shader );
  }

  /**
   * Create a new GLCat program object.
   */
  public createProgram(): GLCatProgram<TContext> {
    const gl = this.__gl;

    const program = gl.createProgram();
    if ( program === null ) {
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    return new GLCatProgram( this, program );
  }

  /**
   * Create a new GLCat program object, in lazier way.
   */
  public lazyProgram( vert: string, frag: string ): GLCatProgram<TContext> {
    const gl = this.__gl;

    // == vert =====================================================================================
    const vertexShader = this.createShader( gl.VERTEX_SHADER );
    if ( vertexShader === null ) {
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    try {
      vertexShader.compile( vert );
    } catch ( e ) {
      vertexShader.dispose();
      throw e;
    }

    // == frag =====================================================================================
    const fragmentShader = this.createShader( gl.FRAGMENT_SHADER );
    if ( fragmentShader === null ) {
      vertexShader.dispose();
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    try {
      fragmentShader.compile( frag );
    } catch ( e ) {
      vertexShader.dispose();
      fragmentShader.dispose();
      throw e;
    }

    // == program ==================================================================================
    const program = this.createProgram();
    if ( program === null ) {
      vertexShader.dispose();
      fragmentShader.dispose();
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    try {
      program.link( vertexShader, fragmentShader );
    } catch ( e ) {
      vertexShader.dispose();
      fragmentShader.dispose();
      program.dispose();
      throw e;
    }

    return program;
  }

  /**
   * Create a new GLCat program object, in lazier way.
   * It's gonna be asynchronous if you have the KHR_parallel_shader_compile extension support.
   */
  public lazyProgramAsync( vert: string, frag: string ): Promise<GLCatProgram<TContext>> {
    const gl = this.__gl;

    // == vert =====================================================================================
    const vertexShader = this.createShader( gl.VERTEX_SHADER );
    if ( vertexShader === null ) {
      return Promise.reject( new Error( GLCat.unexpectedNullDetectedError ) );
    }

    try {
      vertexShader.compile( vert );
    } catch ( e ) {
      vertexShader.dispose();
      return Promise.reject( e );
    }

    // == frag =====================================================================================
    const fragmentShader = this.createShader( gl.FRAGMENT_SHADER );
    if ( fragmentShader === null ) {
      vertexShader.dispose();
      return Promise.reject( new Error( GLCat.unexpectedNullDetectedError ) );
    }

    try {
      fragmentShader.compile( frag );
    } catch ( e ) {
      vertexShader.dispose();
      fragmentShader.dispose();
      return Promise.reject( e );
    }

    // == program ==================================================================================
    const program = this.createProgram();
    if ( program === null ) {
      vertexShader.dispose();
      fragmentShader.dispose();
      return Promise.reject( new Error( GLCat.unexpectedNullDetectedError ) );
    }

    return program.linkAsync( vertexShader, fragmentShader ).then( () => {
      return program;
    } ).catch( ( e ) => {
      vertexShader.dispose();
      fragmentShader.dispose();
      program.dispose();
      throw e;
    } );
  }

  /**
   * Specify a program to use.
   */
  public useProgram( program: GLCatProgram<TContext> | null ): void {
    const gl = this.__gl;

    gl.useProgram( program?.raw || null );
  }

  /**
   * Create a new vertex buffer.
   */
  public createBuffer(): GLCatBuffer<TContext> {
    const gl = this.__gl;

    const buffer = gl.createBuffer();
    if ( buffer === null ) {
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    return new GLCatBuffer( this, buffer );
  }

  /**
   * Create a new vertex array.
   */
  public createVertexArray(): GLCatVertexArray<TContext> {
    const gl = this.__gl;

    if ( gl instanceof WebGL2RenderingContext ) {
      const vertexArray = gl.createVertexArray();
      if ( vertexArray === null ) {
        throw new Error( GLCat.unexpectedNullDetectedError );
      }

      return new GLCatVertexArray( this, vertexArray as any );
    } else {
      const ext = this.getExtension( 'OES_vertex_array_object', true );

      const vertexArray = ext.createVertexArrayOES();
      if ( vertexArray === null ) {
        throw new Error( GLCat.unexpectedNullDetectedError );
      }

      return new GLCatVertexArray( this, vertexArray );
    }
  }

  /**
   * Create a new texture.
   */
  public createTexture(): GLCatTexture<TContext> {
    const gl = this.__gl;

    const texture = gl.createTexture();
    if ( texture === null ) {
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    return new GLCatTexture( this, texture );
  }

  /**
   * Create a new renderbuffer.
   */
  public createRenderbuffer(): GLCatRenderbuffer<TContext> {
    const gl = this.__gl;

    const renderbuffer = gl.createRenderbuffer();
    if ( renderbuffer === null ) {
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    return new GLCatRenderbuffer( this, renderbuffer );
  }

  /**
   * Create a new framebuffer.
   * TODO: DrawBuffers
   */
  public createFramebuffer(): GLCatFramebuffer<TContext> {
    const gl = this.__gl;

    const framebuffer = gl.createFramebuffer();
    if ( framebuffer === null ) {
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    return new GLCatFramebuffer( this, framebuffer );
  }

  /**
   * Create a new framebufer, in lazier way.
   */
  public lazyFramebuffer(
    width: number,
    height: number,
    isFloat = false
  ): GLCatFramebuffer<TContext> {
    const framebuffer = this.createFramebuffer();
    if ( framebuffer === null ) {
      throw new Error( GLCat.unexpectedNullDetectedError );
    }

    const renderbuffer = this.createRenderbuffer();
    if ( renderbuffer === null ) {
      framebuffer.dispose();
      throw new Error( GLCat.unexpectedNullDetectedError );
    }
    renderbuffer.init( width, height );
    framebuffer.attachRenderbuffer( renderbuffer );

    const texture = this.createTexture();
    if ( texture === null ) {
      framebuffer.dispose();
      renderbuffer.dispose();
      throw new Error( GLCat.unexpectedNullDetectedError );
    }
    if ( isFloat ) {
      texture.setTextureFromFloatArray( width, height, null );
    } else {
      texture.setTextureFromArray( width, height, null );
    }
    framebuffer.attachTexture( texture );

    return framebuffer;
  }

  /**
   * Create a new draw buffers, in lazier way.
   * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
   */
  public lazyDrawbuffers(
    width: number,
    height: number,
    numBuffers: number,
    isFloat = false
  ): GLCatFramebuffer<TContext> {
    const { gl } = this;

    if ( gl instanceof WebGL2RenderingContext ) {
      if ( gl.MAX_DRAW_BUFFERS < numBuffers ) {
        throw new Error( 'GLCat: Maximum draw buffers count exceeded' );
      }

      const framebuffer = this.createFramebuffer();
      if ( framebuffer === null ) {
        throw new Error( GLCat.unexpectedNullDetectedError );
      }

      const renderbuffer = this.createRenderbuffer();
      if ( renderbuffer === null ) {
        framebuffer.dispose();
        throw new Error( GLCat.unexpectedNullDetectedError );
      }
      renderbuffer.init( width, height );
      framebuffer.attachRenderbuffer( renderbuffer );

      for ( let i = 0; i < numBuffers; i ++ ) {
        const texture = this.createTexture();

        if ( texture === null ) {
          framebuffer.dispose();
          renderbuffer.dispose();
          throw new Error( GLCat.unexpectedNullDetectedError );
        }

        if ( isFloat ) {
          texture.setTextureFromFloatArray( width, height, null );
        } else {
          texture.setTextureFromArray( width, height, null );
        }
        framebuffer.attachTexture( texture, gl.COLOR_ATTACHMENT0 + i );
      }

      return framebuffer;
    } else {
      const ext = this.getExtension( 'WEBGL_draw_buffers', true );
      if ( ext.MAX_DRAW_BUFFERS_WEBGL < numBuffers ) {
        throw new Error( 'GLCat: Maximum draw buffers count exceeded' );
      }

      const framebuffer = this.createFramebuffer();
      if ( framebuffer === null ) {
        throw new Error( GLCat.unexpectedNullDetectedError );
      }

      const renderbuffer = this.createRenderbuffer();
      if ( renderbuffer === null ) {
        framebuffer.dispose();
        throw new Error( GLCat.unexpectedNullDetectedError );
      }
      renderbuffer.init( width, height );
      framebuffer.attachRenderbuffer( renderbuffer );

      for ( let i = 0; i < numBuffers; i ++ ) {
        const texture = this.createTexture();

        if ( texture === null ) {
          framebuffer.dispose();
          renderbuffer.dispose();
          throw new Error( GLCat.unexpectedNullDetectedError );
        }

        if ( isFloat ) {
          texture.setTextureFromFloatArray( width, height, null );
        } else {
          texture.setTextureFromArray( width, height, null );
        }
        framebuffer.attachTexture( texture, ext.COLOR_ATTACHMENT0_WEBGL + i );
      }

      return framebuffer;
    }
  }

  /**
   * Call this before you're gonna use draw buffers.
   * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
   * If callback is provided, it will execute immediately, and undo the draw buffer after the callback.
   */
  public drawBuffers( arrayOrNumBuffers?: number[] | number, callback?: () => void ): void {
    const { gl } = this;

    if ( gl instanceof WebGL2RenderingContext ) {
      if ( Array.isArray( arrayOrNumBuffers ) ) {
        gl.drawBuffers( arrayOrNumBuffers );
      } else if ( arrayOrNumBuffers ) {
        const array: number[] = [];
        for ( let i = 0; i < arrayOrNumBuffers; i ++ ) {
          array[ i ] = gl.COLOR_ATTACHMENT0 + i;
        }
        gl.drawBuffers( array );
      } else {
        gl.drawBuffers( [ gl.COLOR_ATTACHMENT0 ] );
      }
    } else {
      const ext = this.getExtension( 'WEBGL_draw_buffers', true );

      if ( Array.isArray( arrayOrNumBuffers ) ) {
        ext.drawBuffersWEBGL( arrayOrNumBuffers );
      } else if ( arrayOrNumBuffers ) {
        const array: number[] = [];
        for ( let i = 0; i < arrayOrNumBuffers; i ++ ) {
          array[ i ] = ext.COLOR_ATTACHMENT0_WEBGL + i;
        }
        ext.drawBuffersWEBGL( array );
      } else {
        ext.drawBuffersWEBGL( [ gl.BACK ] );
      }
    }

    if ( callback ) {
      callback();
      this.drawBuffers();
    }
  }

  /**
   * a wrapper of drawElementsInstanced.
   */
  public drawArraysInstanced(
    mode: GLenum,
    first: GLint,
    count: GLsizei,
    primcount: GLsizei
  ): void {
    const { gl } = this;

    if ( gl instanceof WebGL2RenderingContext ) {
      gl.drawArraysInstanced( mode, first, count, primcount );
    } else {
      const ext = this.getExtension( 'ANGLE_instanced_arrays', true );
      ext.drawArraysInstancedANGLE( mode, first, count, primcount );
    }
  }

  /**
   * a wrapper of drawElementsInstanced.
   */
  public drawElementsInstanced(
    mode: GLenum,
    count: GLsizei,
    type: GLenum,
    offset: GLintptr,
    instanceCount: GLsizei
  ): void {
    const { gl } = this;

    if ( gl instanceof WebGL2RenderingContext ) {
      gl.drawElementsInstanced( mode, count, type, offset, instanceCount );
    } else {
      const ext = this.getExtension( 'ANGLE_instanced_arrays', true );
      ext.drawElementsInstancedANGLE( mode, count, type, offset, instanceCount );
    }
  }

  /**
   * Clear the current framebuffer.
   */
  public clear(
    red = 0.0,
    green = 0.0,
    blue = 0.0,
    alpha = 1.0,
    depth = 1.0
  ): void {
    const gl = this.__gl;

    gl.clearColor( red, green, blue, alpha );
    gl.clearDepth( depth );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  }
}
