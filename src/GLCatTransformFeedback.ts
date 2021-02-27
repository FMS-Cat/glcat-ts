import type { GLCat } from './GLCat';
import { GLCatBuffer } from './GLCatBuffer';

/**
 * It's a WebGLTransformFeedback.
 */
export class GLCatTransformFeedback<
  TContext extends WebGLRenderingContext | WebGL2RenderingContext
> {
  private __glCat: GLCat<TContext>;
  private __transformFeedback: WebGLTransformFeedback;

  /**
   * Its own transform feedback.
   */
  public get transformFeedback(): WebGLTransformFeedback {
    return this.__transformFeedback;
  }

  /**
   * Its own transform feedback. Shorter than {@link transformFeedback}.
   */
  public get raw(): WebGLTransformFeedback {
    return this.__transformFeedback;
  }

  /**
   * Create a new GLCatTransformFeedback instance.
   */
  public constructor( glCat: GLCat<TContext>, transformFeedback: WebGLTransformFeedback ) {
    this.__glCat = glCat;
    this.__transformFeedback = transformFeedback;
  }

  /**
   * Dispose the transform feedback.
   */
  public dispose(): void {
    const { gl } = this.__glCat;

    if ( WebGL2RenderingContext && gl instanceof WebGL2RenderingContext ) {
      gl.deleteTransformFeedback( this.__transformFeedback );
    }
  }

  /**
   * Bind a buffer to this transform feedback.
   */
  public bindBuffer( index: GLuint, buffer: GLCatBuffer<TContext> | null ): void {
    const { gl } = this.__glCat;

    if ( WebGL2RenderingContext && gl instanceof WebGL2RenderingContext ) {
      this.__glCat.bindTransformFeedback( this, () => {
        gl.bindBufferBase( gl.TRANSFORM_FEEDBACK_BUFFER, index, buffer?.buffer ?? null );
      } );
    }
  }
}
