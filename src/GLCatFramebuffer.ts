import GL from './constants';
import { GLCat } from './GLCat';
import { GLCatRenderbuffer } from './GLCatRenderbuffer';
import { GLCatTexture } from './GLCatTexture';

/**
 * It's a WebGLFramebuffer.
 */
export class GLCatFramebuffer {
  private __glCat: GLCat;
  private __framebuffer: WebGLFramebuffer;
  private __renderbuffer: GLCatRenderbuffer | null = null;
  private __texture: GLCatTexture | null = null;

  /**
   * Create a new GLCatFramebuffer instance.
   */
  constructor( glCat: GLCat, framebuffer: WebGLFramebuffer ) {
    this.__glCat = glCat;
    this.__framebuffer = framebuffer;
  }

  /**
   * Dispose the framebuffer.
   */
  public dispose() {
    this.__glCat.getRenderingContext().deleteFramebuffer( this.__framebuffer );
  }

  /**
   * Return its own framebuffer.
   */
  public getFramebuffer(): WebGLFramebuffer {
    return this.__framebuffer;
  }

  /**
   * Return its attached renderbuffer.
   */
  public getRenderbuffer(): GLCatRenderbuffer | null {
    return this.__renderbuffer;
  }

  /**
   * Return its attached texture.
   */
  public getTexture(): GLCatTexture | null {
    return this.__texture;
  }

  /**
   * Attach a renderbuffer to this framebuffer.
   */
  public attachRenderbuffer( renderbuffer: GLCatRenderbuffer, attachment: number = GL.DEPTH_ATTACHMENT ): void {
    const gl = this.__glCat.getRenderingContext();

    gl.bindFramebuffer( gl.FRAMEBUFFER, this.__framebuffer );
    gl.framebufferRenderbuffer( gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, renderbuffer.getRenderbuffer() );
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );

    this.__renderbuffer = renderbuffer;
  }

  /**
   * Attach a texture to this framebuffer.
   */
  public attachTexture( texture: GLCatTexture, attachment: number = GL.COLOR_ATTACHMENT0 ): void {
    const gl = this.__glCat.getRenderingContext();

    gl.bindFramebuffer( gl.FRAMEBUFFER, this.__framebuffer );
    gl.framebufferTexture2D( gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture.getTexture(), 0 );
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );

    this.__texture = texture;
  }
}
