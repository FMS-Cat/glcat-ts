import GL from './constants';
import { GLCat } from './GLCat';

/**
 * It's a WebGLRenderbuffer.
 */
export class GLCatRenderbuffer {
  private glCat: GLCat;
  private renderbuffer: WebGLRenderbuffer;
  private width: number = 0;
  private height: number = 0;

  /**
   * Create a new GLCatTexture instance.
   */
  constructor( glCat: GLCat, renderbuffer: WebGLRenderbuffer ) {
    this.glCat = glCat;
    this.renderbuffer = renderbuffer;
  }

  /**
   * Return its own renderbuffer.
   */
  public getRenderbuffer(): WebGLRenderbuffer {
    return this.renderbuffer;
  }

  /**
   * Return its width.
   */
  public getWidth(): number {
    return this.width;
  }

  /**
   * Return its height.
   */
  public getHeight(): number {
    return this.height;
  }

  /**
   * Initialize this renderbuffer.
   * If `format` is not given, it will be initialized as `DEPTH_COMPONENT16` .
   */
  public init( width: number, height: number, format: number = GL.DEPTH_COMPONENT16 ): void {
    const gl = this.glCat.getRenderingContext();

    gl.bindRenderbuffer( gl.RENDERBUFFER, this.renderbuffer );
    gl.renderbufferStorage( gl.RENDERBUFFER, format, width, height );
    gl.bindRenderbuffer( gl.RENDERBUFFER, null );

    this.width = width;
    this.height = height;
  }
}
