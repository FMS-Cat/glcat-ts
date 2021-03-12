import type { GLCat } from './GLCat';
import { GLCatErrors } from './GLCatErrors';
import { GL_RENDERBUFFER } from './GLConstants';

type WebGL1 = WebGLRenderingContext;
type WebGL2 = WebGL2RenderingContext;

/**
 * It's a WebGLRenderbuffer.
 */
export class GLCatRenderbuffer<TContext extends WebGL1 | WebGL2 = WebGL1 | WebGL2> {
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
  public renderbufferStorage(
    width: number,
    height: number,
    { format = this.__glCat.preferredDepthFormat } = {}
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindRenderbuffer( this, () => {
      gl.renderbufferStorage( GL_RENDERBUFFER, format, width, height );
    } );

    this.__width = width;
    this.__height = height;
  }

  /**
   * Initialize this renderbuffer with multisample enabled.
   * If you are using WebGL1, it will fallback to non multisample one instead.
   */
  public renderbufferStorageMultisample(
    width: number,
    height: number,
    {
      samples = this.__glCat.preferredMultisampleSamples,
      format = this.__glCat.preferredDepthFormat,
      fallbackWebGL1 = true
    } = {}
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindRenderbuffer( this, () => {
      if ( WebGL2RenderingContext && gl instanceof WebGL2RenderingContext ) {
        gl.renderbufferStorageMultisample( GL_RENDERBUFFER, samples, format, width, height );
      } else {
        if ( fallbackWebGL1 ) {
          gl.renderbufferStorage( GL_RENDERBUFFER, format, width, height );
        } else {
          throw GLCatErrors.WebGL2ExclusiveError;
        }
      }
    } );

    this.__width = width;
    this.__height = height;
  }
}
