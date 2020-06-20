import { GL } from './GL';
import { GLCat } from './GLCat';

/**
 * It's a WebGLBuffer.
 */
export class GLCatBuffer<TContext extends WebGLRenderingContext | WebGL2RenderingContext> {
  private __glCat: GLCat<TContext>;
  private __buffer: WebGLBuffer;

  /**
   * Its own buffer.
   */
  public get buffer(): WebGLBuffer {
    return this.__buffer;
  }

  /**
   * Its own buffer. Shorter than [[GLCatBuffer.buffer]].
   */
  public get raw(): WebGLBuffer {
    return this.__buffer;
  }

  /**
   * Create a new GLCatBuffer instance.
   */
  public constructor( glCat: GLCat<TContext>, buffer: WebGLBuffer ) {
    this.__glCat = glCat;
    this.__buffer = buffer;
  }

  /**
   * Dispose the buffer.
   */
  public dispose(): void {
    this.__glCat.gl.deleteBuffer( this.__buffer );
  }

  /**
   * Set new data into this buffer.
   */
  public setVertexbuffer(
    source: ArrayBuffer | ArrayBufferView | null,
    usage: number = GL.STATIC_DRAW
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindVertexBuffer( this, () => {
      gl.bufferData( gl.ARRAY_BUFFER, source, usage );
    } );
  }

  /**
   * Set new index data into this buffer.
   */
  public setIndexbuffer(
    source: ArrayBuffer | ArrayBufferView | null,
    usage: number = GL.STATIC_DRAW
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindIndexBuffer( this, () => {
      gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, source, usage );
    } );
  }
}
