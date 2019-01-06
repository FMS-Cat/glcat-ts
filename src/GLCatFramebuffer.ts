import GL from './constants';
import { GLCat } from './GLCat';
import { GLCatRenderbuffer } from './GLCatRenderbuffer';
import { GLCatTexture } from './GLCatTexture';

/**
 * It's a WebGLFramebuffer.
 */
export class GLCatFramebuffer {
  private glCat: GLCat;
  private framebuffer: WebGLFramebuffer;
  private renderbuffer: GLCatRenderbuffer | null = null;
  private texture: GLCatTexture | null = null;

  /**
   * Create a new GLCatFramebuffer instance.
   */
  constructor( glCat: GLCat, framebuffer: WebGLFramebuffer ) {
    this.glCat = glCat;
    this.framebuffer = framebuffer;
  }

  /**
   * Return its own framebuffer.
   */
  public getFramebuffer(): WebGLFramebuffer {
    return this.framebuffer;
  }

  /**
   * Return its attached renderbuffer.
   */
  public getRenderbuffer(): GLCatRenderbuffer | null {
    return this.renderbuffer;
  }

  /**
   * Return its attached texture.
   */
  public getTexture(): GLCatTexture | null {
    return this.texture;
  }

  /**
   * Attach a renderbuffer to this framebuffer.
   */
  public attachRenderbuffer( renderbuffer: GLCatRenderbuffer, attachment: number = GL.DEPTH_ATTACHMENT ): void {
    const gl = this.glCat.getRenderingContext();

    gl.bindFramebuffer( gl.FRAMEBUFFER, this.framebuffer );
    gl.framebufferRenderbuffer( gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, renderbuffer.getRenderbuffer() );
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );

    this.renderbuffer = renderbuffer;
  }

  /**
   * Attach a texture to this framebuffer.
   */
  public attachTexture( texture: GLCatTexture, attachment: number = GL.COLOR_ATTACHMENT0 ): void {
    const gl = this.glCat.getRenderingContext();

    gl.bindFramebuffer( gl.FRAMEBUFFER, this.framebuffer );
    gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture.getTexture(), 0 );
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );

    this.texture = texture;
  }
}
