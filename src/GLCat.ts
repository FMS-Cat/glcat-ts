import { EventEmitter } from 'eventemitter3';
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
export class GLCat extends EventEmitter {
  public static unexpectedNullDetectedError = new Error( 'GLCat: Unexpected null detected' );

  private gl: WebGLRenderingContext;
  private extensionCache: { [ name: string ]: WebGLExtension } = {};

  /**
   * Create a new GLCat instance.
   * WebGLRenderingContext is required.
   */
  constructor( gl: WebGLRenderingContext ) {
    super();

    this.gl = gl;

    gl.enable( gl.DEPTH_TEST );
    gl.depthFunc( gl.LEQUAL );
    gl.enable( gl.BLEND );
    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
  }

  /**
   * It's... just an `emit( 'error', ...args )`.
   * But, if there are no listeners subscribed to 'error' event,
   * it will throw an error instead. What a cool!
   */
  public spit( error?: Error | string | null ) {
    const bool = super.emit( 'error', error );

    if ( !bool ) {
      if ( typeof error === 'string' ) {
        throw new Error( error );
      } else if ( error ) {
        throw error;
      } else {
        throw new Error( 'Something went wrong' );
      }
    }
  }

  /**
   * Return its own WebGLRenderingContext.
   */
  public getRenderingContext(): WebGLRenderingContext {
    return this.gl;
  }

  /**
   * Retrieve an extension.
   * If they is your precious one and you cannot live without him, turn on `throwIfNotFound`.
   */
  public getExtension( name: string, throwIfNotFound?: boolean ): WebGLExtension | null {
    const gl = this.gl;

    if ( this.extensionCache[ name ] ) {
      return this.extensionCache[ name ];
    } else {
      this.extensionCache[ name ] = gl.getExtension( name );
      if ( this.extensionCache[ name ] ) {
        return this.extensionCache[ name ];
      } else {
        if ( throwIfNotFound ) {
          this.spit( 'GLCat.getExtension: The extension "' + name + '" is not supported' );
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
  public createShader( type: number ): GLCatShader | null {
    const gl = this.gl;

    const shader = gl.createShader( type );
    if ( shader === null ) {
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }

    return new GLCatShader( this, shader );
  }

  /**
   * Create a new GLCat program object.
   */
  public createProgram(): GLCatProgram | null {
    const gl = this.gl;

    const program = gl.createProgram();
    if ( program === null ) {
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }

    return new GLCatProgram( this, program );
  }

  /**
   * Create a new GLCat program object, in lazier way.
   */
  public lazyProgram( vert: string, frag: string ): {
    vertexShader: GLCatShader,
    fragmentShader: GLCatShader,
    program: GLCatProgram
  } | null {
    const gl = this.gl;

    // == vert =====================================================================================
    const vertexShader = this.createShader( gl.VERTEX_SHADER );
    if ( vertexShader === null ) {
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }

    vertexShader.compile( vert );
    if ( !vertexShader.isCompiled() ) {
      vertexShader.dispose();
      return null;
    }

    // == frag =====================================================================================
    const fragmentShader = this.createShader( gl.FRAGMENT_SHADER );
    if ( fragmentShader === null ) {
      vertexShader.dispose();
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }

    fragmentShader.compile( frag );
    if ( !fragmentShader.isCompiled() ) {
      vertexShader.dispose();
      fragmentShader.dispose();
      return null;
    }

    // == program ==================================================================================
    const program = this.createProgram();
    if ( program === null ) {
      vertexShader.dispose();
      fragmentShader.dispose();
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }

    program.link( vertexShader, fragmentShader );
    if ( !program.isLinked() ) {
      vertexShader.dispose();
      fragmentShader.dispose();
      program.dispose();
      return null;
    }

    return {
      vertexShader,
      fragmentShader,
      program
    };
  }

  /**
   * Specify a program to use.
   */
  public useProgram( program: GLCatProgram | null ): void {
    const gl = this.gl;

    if ( program === null ) {
      this.spit( GLCat.unexpectedNullDetectedError );
      return;
    }

    gl.useProgram( program.getProgram() );
  }

  /**
   * Create a new vertex buffer.
   */
  public createBuffer(): GLCatBuffer | null {
    const gl = this.gl;

    const buffer = gl.createBuffer();
    if ( buffer === null ) {
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }

    return new GLCatBuffer( this, buffer );
  }

  /**
   * Create a new texture.
   */
  public createTexture(): GLCatTexture | null {
    const gl = this.gl;

    const texture = gl.createTexture();
    if ( texture === null ) {
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }

    return new GLCatTexture( this, texture );
  }

  /**
   * Create a new renderbuffer.
   */
  public createRenderbuffer(): GLCatRenderbuffer | null {
    const gl = this.gl;

    const renderbuffer = gl.createRenderbuffer();
    if ( renderbuffer === null ) {
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }

    return new GLCatRenderbuffer( this, renderbuffer );
  }

  /**
   * Create a new framebuffer.
   * TODO: DrawBuffers
   */
  public createFramebuffer(): GLCatFramebuffer | null {
    const gl = this.gl;

    const framebuffer = gl.createFramebuffer();
    if ( framebuffer === null ) {
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }

    return new GLCatFramebuffer( this, framebuffer );
  }

  /**
   * Create a new framebufer, in lazier way.
   */
  public lazyFramebuffer( width: number, height: number, isFloat: boolean = false ): {
    framebuffer: GLCatFramebuffer,
    renderbuffer: GLCatRenderbuffer,
    texture: GLCatTexture
  } | null {
    const framebuffer = this.createFramebuffer();
    if ( framebuffer === null ) {
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }

    const renderbuffer = this.createRenderbuffer();
    if ( renderbuffer === null ) {
      framebuffer.dispose();
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }
    renderbuffer.init( width, height );
    framebuffer.attachRenderbuffer( renderbuffer );

    const texture = this.createTexture();
    if ( texture === null ) {
      framebuffer.dispose();
      renderbuffer.dispose();
      this.spit( GLCat.unexpectedNullDetectedError );
      return null;
    }
    if ( isFloat ) {
      texture.setTextureFromFloatArray( width, height, null );
    } else {
      texture.setTextureFromArray( width, height, null );
    }
    framebuffer.attachTexture( texture );

    return {
      framebuffer,
      renderbuffer,
      texture
    };
  }

  /**
   * Clear the current framebuffer.
   */
  public clear(
    red: number = 0.0,
    green: number = 0.0,
    blue: number = 0.0,
    alpha: number = 1.0,
    depth: number = 1.0
  ): void {
    const gl = this.gl;

    gl.clearColor( red, green, blue, alpha );
    gl.clearDepth( depth );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  }
}
