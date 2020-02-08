import { GLCatBuffer } from './GLCatBuffer';
import { GLCatFramebuffer } from './GLCatFramebuffer';
import { GLCatProgram } from './GLCatProgram';
import { GLCatRenderbuffer } from './GLCatRenderbuffer';
import { GLCatShader } from './GLCatShader';
import { GLCatTexture } from './GLCatTexture';

export type WebGLExtension = any;

/**
 * WebGL wrapper with plenty of hackability.
 */
export class GLCat {
  public static unexpectedNullDetectedError = new Error( 'GLCat: Unexpected null detected' );

  private __gl: WebGLRenderingContext;
  private __extensionCache: { [ name: string ]: WebGLExtension } = {};
  private __dummyTextureCache?: GLCatTexture;

  /**
   * Its own WebGLRenderingContext.
   */
  public get renderingContext(): WebGLRenderingContext {
    return this.__gl;
  }

  /**
   * Its own WebGLRenderingContext. Shorter than [[GLCat.renderingContext]]
   */
  public get gl(): WebGLRenderingContext {
    return this.__gl;
  }

  /**
   * Create a new GLCat instance.
   * WebGLRenderingContext is required.
   */
  public constructor( gl: WebGLRenderingContext ) {
    this.__gl = gl;

    gl.enable( gl.DEPTH_TEST );
    gl.depthFunc( gl.LEQUAL );
    gl.enable( gl.BLEND );
    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
  }

  /**
   * A dummy texture, 100% organic pure #FF00FF texture.
   */
  public get dummyTexture(): GLCatTexture {
    if ( this.__dummyTextureCache ) {
      return this.__dummyTextureCache;
    }

    const texture = this.createTexture();
    if ( texture === null ) {
      throw GLCat.unexpectedNullDetectedError;
    }

    texture.setTextureFromArray( 1, 1, new Uint8Array( [ 255, 0, 255, 255 ] ) );
    this.__dummyTextureCache = texture;
    return texture;
  }

  /**
   * Retrieve an extension.
   * If they is your precious one and you cannot live without him, turn on `throwIfNotFound`.
   */
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
  public createShader( type: number ): GLCatShader {
    const gl = this.__gl;

    const shader = gl.createShader( type );
    if ( shader === null ) {
      throw GLCat.unexpectedNullDetectedError;
    }

    return new GLCatShader( this, shader );
  }

  /**
   * Create a new GLCat program object.
   */
  public createProgram(): GLCatProgram {
    const gl = this.__gl;

    const program = gl.createProgram();
    if ( program === null ) {
      throw GLCat.unexpectedNullDetectedError;
    }

    return new GLCatProgram( this, program );
  }

  /**
   * Create a new GLCat program object, in lazier way.
   */
  public lazyProgram( vert: string, frag: string ): GLCatProgram {
    const gl = this.__gl;

    // == vert =====================================================================================
    const vertexShader = this.createShader( gl.VERTEX_SHADER );
    if ( vertexShader === null ) {
      throw GLCat.unexpectedNullDetectedError;
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
      throw GLCat.unexpectedNullDetectedError;
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
      throw GLCat.unexpectedNullDetectedError;
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
  public lazyProgramAsync( vert: string, frag: string ): Promise<GLCatProgram> {
    const gl = this.__gl;

    // == vert =====================================================================================
    const vertexShader = this.createShader( gl.VERTEX_SHADER );
    if ( vertexShader === null ) {
      return Promise.reject( GLCat.unexpectedNullDetectedError );
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
      return Promise.reject( GLCat.unexpectedNullDetectedError );
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
      return Promise.reject( GLCat.unexpectedNullDetectedError );
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
  public useProgram( program: GLCatProgram | null ): void {
    const gl = this.__gl;

    if ( program === null ) {
      throw GLCat.unexpectedNullDetectedError;
    }

    gl.useProgram( program.raw );
  }

  /**
   * Create a new vertex buffer.
   */
  public createBuffer(): GLCatBuffer {
    const gl = this.__gl;

    const buffer = gl.createBuffer();
    if ( buffer === null ) {
      throw GLCat.unexpectedNullDetectedError;
    }

    return new GLCatBuffer( this, buffer );
  }

  /**
   * Create a new texture.
   */
  public createTexture(): GLCatTexture {
    const gl = this.__gl;

    const texture = gl.createTexture();
    if ( texture === null ) {
      throw GLCat.unexpectedNullDetectedError;
    }

    return new GLCatTexture( this, texture );
  }

  /**
   * Create a new renderbuffer.
   */
  public createRenderbuffer(): GLCatRenderbuffer {
    const gl = this.__gl;

    const renderbuffer = gl.createRenderbuffer();
    if ( renderbuffer === null ) {
      throw GLCat.unexpectedNullDetectedError;
    }

    return new GLCatRenderbuffer( this, renderbuffer );
  }

  /**
   * Create a new framebuffer.
   * TODO: DrawBuffers
   */
  public createFramebuffer(): GLCatFramebuffer {
    const gl = this.__gl;

    const framebuffer = gl.createFramebuffer();
    if ( framebuffer === null ) {
      throw GLCat.unexpectedNullDetectedError;
    }

    return new GLCatFramebuffer( this, framebuffer );
  }

  /**
   * Create a new framebufer, in lazier way.
   */
  public lazyFramebuffer( width: number, height: number, isFloat = false ): GLCatFramebuffer {
    const framebuffer = this.createFramebuffer();
    if ( framebuffer === null ) {
      throw GLCat.unexpectedNullDetectedError;
    }

    const renderbuffer = this.createRenderbuffer();
    if ( renderbuffer === null ) {
      framebuffer.dispose();
      throw GLCat.unexpectedNullDetectedError;
    }
    renderbuffer.init( width, height );
    framebuffer.attachRenderbuffer( renderbuffer );

    const texture = this.createTexture();
    if ( texture === null ) {
      framebuffer.dispose();
      renderbuffer.dispose();
      throw GLCat.unexpectedNullDetectedError;
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
  ): GLCatFramebuffer {
    const ext = this.getExtension( 'WEBGL_draw_buffers', true );
    if ( ext.MAX_DRAW_BUFFERS_WEBGL < numBuffers ) {
      throw Error( 'GLCat: Maximum draw buffers count exceeded' );
    }

    const framebuffer = this.createFramebuffer();
    if ( framebuffer === null ) {
      throw GLCat.unexpectedNullDetectedError;
    }

    const renderbuffer = this.createRenderbuffer();
    if ( renderbuffer === null ) {
      framebuffer.dispose();
      throw GLCat.unexpectedNullDetectedError;
    }
    renderbuffer.init( width, height );
    framebuffer.attachRenderbuffer( renderbuffer );

    for ( let i = 0; i < numBuffers; i ++ ) {
      const texture = this.createTexture();

      if ( texture === null ) {
        framebuffer.dispose();
        renderbuffer.dispose();
        throw GLCat.unexpectedNullDetectedError;
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

  /**
   * Call this before you're gonna use draw buffers.
   * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
   */
  public drawBuffers( numBuffers: number[] | number ): void {
    const ext = this.getExtension( 'WEBGL_draw_buffers', true );

    if ( Array.isArray( numBuffers ) ) {
      ext.drawBuffersWEBGL( numBuffers );
    } else {
      const array: number[] = [];
      for ( let i = 0; i < numBuffers; i ++ ) {
        array[ i ] = ext.COLOR_ATTACHMENT0_WEBGL + i;
      }
      ext.drawBuffersWEBGL( array );
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
