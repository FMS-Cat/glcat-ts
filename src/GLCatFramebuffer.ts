import { GL } from './GL';
import { GLCat } from './GLCat';
import { GLCatRenderbuffer } from './GLCatRenderbuffer';
import { GLCatTexture } from './GLCatTexture';

/**
 * It's a WebGLFramebuffer.
 */
export class GLCatFramebuffer<TContext extends WebGLRenderingContext | WebGL2RenderingContext> {
  private __glCat: GLCat<TContext>;
  private __framebuffer: WebGLFramebuffer;
  private __renderbuffer: GLCatRenderbuffer<TContext> | null = null;
  private __textureMap: { [ attachment: number ]: GLCatTexture<TContext> } = {};

  /**
   * Its own framebuffer.
   */
  public get framebuffer(): WebGLFramebuffer {
    return this.__framebuffer;
  }

  /**
   * Its own framebuffer. Shorter than [[GLCatFramebuffer.framebuffer]]
   */
  public get raw(): WebGLFramebuffer {
    return this.__framebuffer;
  }

  /**
   * Its attached renderbuffer.
   */
  public get renderbuffer(): GLCatRenderbuffer<TContext> | null {
    return this.__renderbuffer;
  }

  /**
   * Its attached texture.
   * If you want to retrieve other than `COLOR_ATTACHMENT0`, try [[GLCatFramebuffer.getTexture]] instead.
   */
  public get texture(): GLCatTexture<TContext> | null {
    return this.__textureMap[ GL.COLOR_ATTACHMENT0 ];
  }

  /**
   * Create a new GLCatFramebuffer instance.
   */
  public constructor( glCat: GLCat<TContext>, framebuffer: WebGLFramebuffer ) {
    this.__glCat = glCat;
    this.__framebuffer = framebuffer;
  }

  /**
   * Dispose the framebuffer.
   */
  public dispose( alsoAttached = false ): void {
    const { gl } = this.__glCat;

    gl.deleteFramebuffer( this.__framebuffer );

    if ( alsoAttached ) {
      if ( this.__renderbuffer ) {
        gl.deleteRenderbuffer( this.__renderbuffer.raw );
      }

      Object.values( this.__textureMap ).forEach( ( texture ) => {
        gl.deleteTexture( texture.raw );
      } );
    }
  }

  /**
   * Retrieve its attached texture.
   */
  public getTexture( attachment: number = GL.COLOR_ATTACHMENT0 ): GLCatTexture<TContext> | null {
    return this.__textureMap[ attachment ];
  }

  /**
   * Attach a renderbuffer to this framebuffer.
   */
  public attachRenderbuffer(
    renderbuffer: GLCatRenderbuffer<TContext>,
    attachment: number = GL.DEPTH_ATTACHMENT
  ): void {
    const { gl } = this.__glCat;

    gl.bindFramebuffer( gl.FRAMEBUFFER, this.__framebuffer );
    gl.framebufferRenderbuffer( gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, renderbuffer.raw );
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );

    this.__renderbuffer = renderbuffer;
  }

  /**
   * Attach a texture to this framebuffer.
   */
  public attachTexture(
    texture: GLCatTexture<TContext>,
    attachment: number = GL.COLOR_ATTACHMENT0
  ): void {
    const { gl } = this.__glCat;

    gl.bindFramebuffer( gl.FRAMEBUFFER, this.__framebuffer );
    gl.framebufferTexture2D( gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture.raw, 0 );
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );

    this.__textureMap[ attachment ] = texture;
  }
}
