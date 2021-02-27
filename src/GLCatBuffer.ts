import { GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW } from './GLConstants';
import type { GLCat } from './GLCat';

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
  public setVertexbuffer( size: GLsizeiptr, usage?: number ): void;
  public setVertexbuffer( source: BufferSource | null, usage?: number ): void;
  public setVertexbuffer(
    source: GLsizeiptr | BufferSource | null,
    usage: number = GL_STATIC_DRAW
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindVertexBuffer( this, () => {
      gl.bufferData( GL_ARRAY_BUFFER, source as any, usage ); // this sucks
    } );
  }

  /**
   * Set new index data into this buffer.
   */
  public setIndexbuffer( size: GLsizeiptr, usage?: number ): void;
  public setIndexbuffer( source: BufferSource | null, usage?: number ): void;
  public setIndexbuffer(
    source: GLsizeiptr | BufferSource | null,
    usage: number = GL_STATIC_DRAW
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindIndexBuffer( this, () => {
      gl.bufferData( GL_ELEMENT_ARRAY_BUFFER, source as any, usage ); // this sucks
    } );
  }
}
