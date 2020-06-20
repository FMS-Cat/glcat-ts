import { GL } from './GL';
import type { GLCat } from './GLCat';
import type { GLCatRenderbuffer } from './GLCatRenderbuffer';
import type { GLCatTexture } from './GLCatTexture';

/**
 * It's a WebGLFramebuffer.
 */
export class GLCatFramebuffer<TContext extends WebGLRenderingContext | WebGL2RenderingContext> {
  private __glCat: GLCat<TContext>;
  private __framebuffer: WebGLFramebuffer;
  private __renderbufferMap = new Map<GLenum, GLCatRenderbuffer<TContext>>();
  private __textureMap = new Map<GLenum, GLCatTexture<TContext>>();

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
   * If you want to grab other than `DEPTH_ATTACHMENT`, try [[GLCatFramebuffer.getRenderbuffer]] instead.
   */
  public get renderbuffer(): GLCatRenderbuffer<TContext> | null {
    return this.__renderbufferMap.get( GL.DEPTH_ATTACHMENT ) ?? null;
  }

  /**
   * Its attached texture.
   * If you want to grab other than `COLOR_ATTACHMENT0`, try [[GLCatFramebuffer.getTexture]] instead.
   */
  public get texture(): GLCatTexture<TContext> | null {
    return this.__textureMap.get( GL.COLOR_ATTACHMENT0 ) ?? null;
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
      for ( const renderbuffer of this.__renderbufferMap.values() ) {
        gl.deleteRenderbuffer( renderbuffer.raw );
      }

      for ( const texture of this.__textureMap.values() ) {
        gl.deleteTexture( texture.raw );
      }
    }
  }

  /**
   * Retrieve its attached renderbuffer.
   */
  public getRenderbuffer( attachment = GL.DEPTH_ATTACHMENT ): GLCatRenderbuffer<TContext> | null {
    return this.__renderbufferMap.get( attachment ) ?? null;
  }

  /**
   * Retrieve its attached texture.
   */
  public getTexture( attachment = GL.COLOR_ATTACHMENT0 ): GLCatTexture<TContext> | null {
    return this.__textureMap.get( attachment ) ?? null;
  }

  /**
   * Attach a renderbuffer to this framebuffer.
   */
  public attachRenderbuffer(
    renderbuffer: GLCatRenderbuffer<TContext>,
    {
      attachment = GL.DEPTH_ATTACHMENT
    } = {}
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindFramebuffer( this, () => {
      gl.framebufferRenderbuffer( gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, renderbuffer.raw );
    } );

    this.__renderbufferMap.set( attachment, renderbuffer );
  }

  /**
   * Attach a texture to this framebuffer.
   */
  public attachTexture(
    texture: GLCatTexture<TContext>,
    {
      level = 0,
      attachment = GL.COLOR_ATTACHMENT0
    } = {}
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindFramebuffer( this, () => {
      gl.framebufferTexture2D( gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture.raw, level );
    } );

    this.__textureMap.set( attachment, texture );
  }
}
