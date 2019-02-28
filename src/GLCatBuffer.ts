import GL from './constants';
import { GLCat } from './GLCat';

/**
 * It's a WebGLBuffer.
 */
export class GLCatBuffer {
  private __glCat: GLCat;
  private __buffer: WebGLBuffer;

  /**
   * Create a new GLCatBuffer instance.
   */
  constructor( glCat: GLCat, buffer: WebGLBuffer ) {
    this.__glCat = glCat;
    this.__buffer = buffer;
  }

  /**
   * Dispose the buffer.
   */
  public dispose() {
    this.__glCat.getRenderingContext().deleteBuffer( this.__buffer );
  }

  /**
   * Retrieve its own buffer.
   */
  public getBuffer(): WebGLBuffer {
    return this.__buffer;
  }

  /**
   * Set new data into this buffer.
   */
  public setVertexbuffer( source: ArrayBuffer | ArrayBufferView | null, usage: number = GL.STATIC_DRAW ): void {
    const gl = this.__glCat.getRenderingContext();

    gl.bindBuffer( gl.ARRAY_BUFFER, this.__buffer );
    gl.bufferData( gl.ARRAY_BUFFER, source, usage );
    gl.bindBuffer( gl.ARRAY_BUFFER, null );
  }

  /**
   * Set new index data into this buffer.
   */
  public setIndexbuffer( source: ArrayBuffer | ArrayBufferView | null, usage: number = GL.STATIC_DRAW ): void {
    const gl = this.__glCat.getRenderingContext();

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.__buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, source, usage );
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
  }
}
