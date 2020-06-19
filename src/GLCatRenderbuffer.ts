import { GL } from './GL';
import { GLCat } from './GLCat';

/**
 * It's a WebGLRenderbuffer.
 */
export class GLCatRenderbuffer<TContext extends WebGLRenderingContext | WebGL2RenderingContext> {
  private __glCat: GLCat<TContext>;
  private __renderbuffer: WebGLRenderbuffer;
  private __width = 0;
  private __height = 0;

  /**
   * Its own renderbuffer.
   */
  public get renderbuffer(): WebGLRenderbuffer {
    return this.__renderbuffer;
  }

  /**
   * Its own renderbuffer. Shorter than [[GLCatRenderBuffer.renderbuffer]].
   */
  public get raw(): WebGLRenderbuffer {
    return this.__renderbuffer;
  }

  /**
   * Its width.
   */
  public get width(): number {
    return this.__width;
  }

  /**
   * Its height.
   */
  public get height(): number {
    return this.__height;
  }

  /**
   * Create a new GLCatTexture instance.
   */
  public constructor( glCat: GLCat<TContext>, renderbuffer: WebGLRenderbuffer ) {
    this.__glCat = glCat;
    this.__renderbuffer = renderbuffer;
  }

  /**
   * Dispose the renderbuffer.
   */
  public dispose(): void {
    this.__glCat.gl.deleteRenderbuffer( this.__renderbuffer );
  }

  /**
   * Initialize this renderbuffer.
   * If `format` is not given, it will be initialized as `DEPTH_COMPONENT16` .
   */
  public init( width: number, height: number, format: number = GL.DEPTH_COMPONENT16 ): void {
    const { gl } = this.__glCat;

    gl.bindRenderbuffer( gl.RENDERBUFFER, this.__renderbuffer );
    gl.renderbufferStorage( gl.RENDERBUFFER, format, width, height );
    gl.bindRenderbuffer( gl.RENDERBUFFER, null );

    this.__width = width;
    this.__height = height;
  }
}
