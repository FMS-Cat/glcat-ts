import { GL } from './GL';
import type { GLCat } from './GLCat';

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
   */
  public init(
    width: number,
    height: number,
    { format = this.__glCat.preferredDepthFormat } = {}
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindRenderbuffer( this, () => {
      gl.renderbufferStorage( gl.RENDERBUFFER, format, width, height );
    } );

    this.__width = width;
    this.__height = height;
  }

  /**
   * Initialize this renderbuffer with multisample enabled.
   * If you are using WebGL1, it will fallback to non multisample one instead.
   */
  public initMultisample(
    width: number,
    height: number,
    {
      samples = this.__glCat.preferredMultisampleSamples,
      format = GL.DEPTH_ATTACHMENT
    } = {}
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindRenderbuffer( this, () => {
      if ( gl instanceof WebGL2RenderingContext ) {
        gl.renderbufferStorageMultisample( gl.RENDERBUFFER, samples, format, width, height );
      } else {
        gl.renderbufferStorage( gl.RENDERBUFFER, format, width, height );
      }
    } );

    this.__width = width;
    this.__height = height;
  }
}
