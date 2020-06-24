import type { GLCat, GLCatVertexArrayRawType } from './GLCat';
import { GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_FLOAT } from './GLConstants';
import type { GLCatBuffer } from './GLCatBuffer';

/**
 * It's a WebGLVertexArrayObject.
 */
export class GLCatVertexArray<TContext extends WebGLRenderingContext | WebGL2RenderingContext> {
  private __glCat: GLCat<TContext>;
  private __vertexArray: GLCatVertexArrayRawType<TContext>;

  /**
   * Its own buffer.
   */
  public get buffer(): GLCatVertexArrayRawType<TContext> {
    return this.__vertexArray;
  }

  /**
   * Its own buffer. Shorter than [[GLCatBuffer.buffer]].
   */
  public get raw(): GLCatVertexArrayRawType<TContext> {
    return this.__vertexArray;
  }

  /**
   * Create a new GLCatBuffer instance.
   */
  public constructor( glCat: GLCat<TContext>, vertexArray: GLCatVertexArrayRawType<TContext> ) {
    this.__glCat = glCat;
    this.__vertexArray = vertexArray;
  }

  /**
   * Dispose the buffer.
   */
  public dispose(): void {
    const { gl } = this.__glCat;

    if ( WebGL2RenderingContext && gl instanceof WebGL2RenderingContext ) {
      gl.deleteVertexArray( this.__vertexArray );
    } else {
      const ext = this.__glCat.getExtension( 'OES_vertex_array_object', true );
      ext.deleteVertexArrayOES( this.__vertexArray as any );
    }
  }

  /**
   * Bind a vertex buffer to the vertex array.
   */
  public bindVertexbuffer(
    source: GLCatBuffer<TContext>,
    location: number,
    size = 1,
    divisor = 0,
    type: number = GL_FLOAT,
    stride = 0,
    offset = 0
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindVertexArray( this, () => {
      gl.bindBuffer( GL_ARRAY_BUFFER, source.raw );
      gl.enableVertexAttribArray( location );
      gl.vertexAttribPointer( location, size, type, false, stride, offset );

      if ( WebGL2RenderingContext && gl instanceof WebGL2RenderingContext ) {
        gl.vertexAttribDivisor( location, divisor );
      } else {
        const ext = this.__glCat.getExtension( 'ANGLE_instanced_arrays' );
        if ( ext ) {
          ext.vertexAttribDivisorANGLE( location, divisor );
        }
      }
    } );
  }

  /**
   * Bind an index buffer to the vertex array.
   */
  public bindIndexbuffer(
    source: GLCatBuffer<TContext>
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindVertexArray( this, () => {
      gl.bindBuffer( GL_ELEMENT_ARRAY_BUFFER, source.raw );
    } );
  }
}
