import { GL } from './GL';
import { GLCat } from './GLCat';

const zeroTextureArray = new Uint8Array( [ 0, 0, 0, 0 ] );

/**
 * It's a WebGLTexture.
 */
export class GLCatTexture<TContext extends WebGLRenderingContext | WebGL2RenderingContext> {
  private __glCat: GLCat<TContext>;
  private __texture: WebGLTexture;
  private __width = 0;
  private __height = 0;

  /**
   * Its own texture.
   */
  public get texture(): WebGLTexture {
    return this.__texture;
  }

  /**
   * Its own texture. Shorter than [[GLCatTexture.textured]]
   */
  public get raw(): WebGLTexture {
    return this.__texture;
  }

  /**
   * Its width.
   */
  public get width(): number {
    return this.__width;
  }

  /**
   * Its height.
   */
  public get height(): number {
    return this.__height;
  }

  /**
   * Create a new GLCatTexture instance.
   */
  public constructor( glCat: GLCat<TContext>, texture: WebGLTexture ) {
    this.__glCat = glCat;
    this.__texture = texture;
    this.textureFilter( GL.LINEAR );
    this.textureWrap( GL.CLAMP_TO_EDGE );
  }

  /**
   * Dispose the texture.
   */
  public dispose(): void {
    this.__glCat.gl.deleteTexture( this.__texture );
  }

  /**
   * Specify how to filter the texture.
   */
  public textureFilter(): void;
  public textureFilter( filter: number ): void;
  public textureFilter( filterMag: number, filterMin: number ): void;
  public textureFilter( filterMag: number = GL.NEAREST, filterMin: number = filterMag ): void {
    const { gl } = this.__glCat;

    gl.bindTexture( gl.TEXTURE_2D, this.__texture );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterMag );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterMin );
    gl.bindTexture( gl.TEXTURE_2D, null );
  }

  /**
   * Specify how to wrap the texture.
   */
  public textureWrap(): void;
  public textureWrap( wrap: number ): void;
  public textureWrap( wrapS: number, wrapT: number ): void;
  public textureWrap( wrapS: number = GL.CLAMP_TO_EDGE, wrapT: number = wrapS ): void {
    const { gl } = this.__glCat;

    gl.bindTexture( gl.TEXTURE_2D, this.__texture );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT );
    gl.bindTexture( gl.TEXTURE_2D, null );
  }

  /**
   * Return a value for the passed parameter name.
   * See: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
   */
  public getParameter( pname: GLenum ): void {
    const { gl } = this.__glCat;

    gl.bindTexture( gl.TEXTURE_2D, this.__texture );
    gl.getParameter( pname );
    gl.bindTexture( gl.TEXTURE_2D, null );
  }

  /**
   * Specify the pixel storage modes.
   * See: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/pixelStorei
   */
  public pixelStorei( pname: GLenum, param: number | boolean ): void {
    const { gl } = this.__glCat;

    gl.bindTexture( gl.TEXTURE_2D, this.__texture );
    gl.pixelStorei( pname, param );
    gl.bindTexture( gl.TEXTURE_2D, null );
  }

  /**
   * Set new data into this texture.
   */
  public setTexture( source: TexImageSource ): void {
    const { gl } = this.__glCat;

    gl.bindTexture( gl.TEXTURE_2D, this.__texture );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source );
    gl.bindTexture( gl.TEXTURE_2D, null );

    this.__width = source.width;
    this.__height = source.height;
  }

  /**
   * Set new data into this texture.
   * This function uses `Uint8Array`. If you want to source image data, use `GLCat.setTexture()` instead.
   * Or you want to use float texture? Try this: `GLCat.setTextureFromFloatArray()`
   */
  public setTextureFromArray(
    width: number,
    height: number,
    source: Uint8Array | null,
    format: number = GL.RGBA
  ): void {
    const { gl } = this.__glCat;

    gl.bindTexture( gl.TEXTURE_2D, this.__texture );
    gl.texImage2D( gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, source );
    gl.bindTexture( gl.TEXTURE_2D, null );

    this.__width = width;
    this.__height = height;
  }

  /**
   * Set new data into this texture.
   * This function uses `Float32Array`.
   * If you can't grab `OES_texture_float` extension here, you will die at this point.
   */
  public setTextureFromFloatArray(
    width: number,
    height: number,
    source: Float32Array | null,
    format: number = GL.RGBA
  ): void {
    const { gl } = this.__glCat;

    this.__glCat.getExtension( 'OES_texture_float', true );

    gl.bindTexture( gl.TEXTURE_2D, this.__texture );
    gl.texImage2D( gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.FLOAT, source );
    if ( this.__glCat.getExtension( 'OES_texture_float_linear' ) === null ) {
      this.textureFilter( gl.NEAREST );
    }
    gl.bindTexture( gl.TEXTURE_2D, null );

    this.__width = width;
    this.__height = height;
  }

  /**
   * Copy pixels from current framebuffer to given texture.
   */
  public copyTexture( width: number, height: number ): void {
    const { gl } = this.__glCat;

    gl.bindTexture( gl.TEXTURE_2D, this.__texture );
    gl.copyTexImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, width, height, 0 );
    gl.bindTexture( gl.TEXTURE_2D, null );

    this.__width = width;
    this.__height = height;
  }

  /**
   * Set new cubemap data into this texture.
   * @param textures Array of iamges. Order: `X+`, `X-`, `Y+`, `Y-`, `Z+`, `Z-`
   * @todo due to compatibility of its `width` and `height` it should not be used yet
   */
  public setCubemap( textures: TexImageSource[] ): void {
    const { gl } = this.__glCat;

    gl.bindTexture( gl.TEXTURE_CUBE_MAP, this.__texture );
    for ( let i = 0; i < 6; i ++ ) {
      gl.texImage2D(
        gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textures[ i ]
      );
    }
    gl.texParameteri( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
    gl.bindTexture( gl.TEXTURE_CUBE_MAP, null );
  }

  /**
   * Set [ 0, 0, 0, 0 ] to this texture.
   * Useful for temporary use..
   */
  public setZeroTexture(): void {
    this.setTextureFromArray( 1, 1, zeroTextureArray );
  }
}
