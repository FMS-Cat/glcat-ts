import GL from './constants';
import { GLCat } from './GLCat';

/**
 * It's a WebGLRenderbuffer.
 */
export class GLCatRenderbuffer {
  private __glCat: GLCat;
  private __renderbuffer: WebGLRenderbuffer;
  private __width: number = 0;
  private __height: number = 0;

  /**
   * Create a new GLCatTexture instance.
   */
  constructor( glCat: GLCat, renderbuffer: WebGLRenderbuffer ) {
    this.__glCat = glCat;
    this.__renderbuffer = renderbuffer;
  }

  /**
   * Dispose the renderbuffer.
   */
  public dispose() {
    this.__glCat.getRenderingContext().deleteRenderbuffer( this.__renderbuffer );
  }

  /**
   * Return its own renderbuffer.
   */
  public getRenderbuffer(): WebGLRenderbuffer {
    return this.__renderbuffer;
  }

  /**
   * Return its width.
   */
  public getWidth(): number {
    return this.__width;
  }

  /**
   * Return its height.
   */
  public getHeight(): number {
    return this.__height;
  }

  /**
   * Initialize this renderbuffer.
   * If `format` is not given, it will be initialized as `DEPTH_COMPONENT16` .
   */
  public init( width: number, height: number, format: number = GL.DEPTH_COMPONENT16 ): void {
    const gl = this.__glCat.getRenderingContext();

    gl.bindRenderbuffer( gl.RENDERBUFFER, this.__renderbuffer );
    gl.renderbufferStorage( gl.RENDERBUFFER, format, width, height );
    gl.bindRenderbuffer( gl.RENDERBUFFER, null );

    this.__width = width;
    this.__height = height;
  }
}
