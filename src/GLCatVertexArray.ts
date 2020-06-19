import { GL } from './GL';
import { GLCat } from './GLCat';
import { GLCatBuffer } from './GLCatBuffer';

export type GLCatVertexArrayRawType<TContext extends WebGLRenderingContext | WebGL2RenderingContext>
  = TContext extends WebGL2RenderingContext
    ? WebGLVertexArrayObject
    : WebGLVertexArrayObjectOES;

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

    if ( gl instanceof WebGL2RenderingContext ) {
      gl.deleteVertexArray( this.__vertexArray );
    } else {
      const ext = this.__glCat.getExtension( 'OES_vertex_array_object', true );
      ext.deleteVertexArrayOES( this.__vertexArray );
    }
  }

  /**
   * Bind the vertex array and execute given callback.
   */
  public bindVertexArray( callback: () => void ): void {
    const { gl } = this.__glCat;

    if ( gl instanceof WebGL2RenderingContext ) {
      gl.bindVertexArray( this.__vertexArray );
      callback();
      gl.bindVertexArray( null );
    } else {
      const ext = this.__glCat.getExtension( 'OES_vertex_array_object', true );

      ext.bindVertexArrayOES( this.__vertexArray );
      callback();
      ext.bindVertexArrayOES( null );
    }
  }

  /**
   * Assign a vertex buffer to the vertex array.
   */
  public assignVertexbuffer(
    source: GLCatBuffer<TContext>,
    location: number,
    size = 1,
    divisor = 0,
    type: number = GL.FLOAT,
    stride = 0,
    offset = 0
  ): void {
    const { gl } = this.__glCat;

    this.bindVertexArray( () => {
      gl.bindBuffer( gl.ARRAY_BUFFER, source.raw );
      gl.enableVertexAttribArray( location );
      gl.vertexAttribPointer( location, size, type, false, stride, offset );

      if ( gl instanceof WebGL2RenderingContext ) {
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
   * Assign an index buffer to the vertex array.
   */
  public assignIndexbuffer(
    source: GLCatBuffer<TContext>
  ): void {
    const { gl } = this.__glCat;

    this.bindVertexArray( () => {
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, source.raw );
    } );
  }
}
