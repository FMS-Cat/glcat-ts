import { GL_CLAMP_TO_EDGE, GL_FLOAT, GL_HALF_FLOAT, GL_LINEAR, GL_NEAREST, GL_R16F, GL_R32F, GL_RGBA, GL_RGBA16F, GL_RGBA32F, GL_RGBA8, GL_TEXTURE_2D, GL_TEXTURE_CUBE_MAP, GL_TEXTURE_CUBE_MAP_POSITIVE_X, GL_TEXTURE_MAG_FILTER, GL_TEXTURE_MIN_FILTER, GL_TEXTURE_WRAP_S, GL_TEXTURE_WRAP_T, GL_UNSIGNED_BYTE } from './GLConstants';
import type { GLCat } from './GLCat';
import { GLCatErrors } from './GLCatErrors';

const zeroTextureArray = new Uint8Array( [ 0, 0, 0, 0 ] );

type WebGL1 = WebGLRenderingContext;
type WebGL2 = WebGL2RenderingContext;

/**
 * It's a WebGLTexture.
 */
export class GLCatTexture<TContext extends WebGL1 | WebGL2 = WebGL1 | WebGL2> {
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
    this.textureFilter( GL_LINEAR );
    this.textureWrap( GL_CLAMP_TO_EDGE );
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
  public textureFilter( filterMag: number = GL_NEAREST, filterMin: number = filterMag ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindTexture2D( this, () => {
      gl.texParameteri( GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, filterMag );
      gl.texParameteri( GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, filterMin );
    } );
  }

  /**
   * Specify how to wrap the texture.
   */
  public textureWrap(): void;
  public textureWrap( wrap: number ): void;
  public textureWrap( wrapS: number, wrapT: number ): void;
  public textureWrap( wrapS: number = GL_CLAMP_TO_EDGE, wrapT: number = wrapS ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindTexture2D( this, () => {
      gl.texParameteri( GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, wrapS );
      gl.texParameteri( GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, wrapT );
    } );
  }

  /**
   * Initialize the texture.
   */
  public texStorage2D(
    width: number,
    height: number,
    { target = GL_TEXTURE_2D, level = 1, format = GL_RGBA8 } = {}
  ): void {
    const { gl } = this.__glCat;

    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      this.__glCat.bindTexture2D( this, () => {
        gl.texStorage2D( target, level, format, width, height );
      } );
    } else {
      throw GLCatErrors.WebGL2ExclusiveError;
    }
  }

  /**
   * Return a value for the passed parameter name.
   * See: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
   */
  public getParameter( pname: GLenum ): any {
    const { gl } = this.__glCat;

    return this.__glCat.bindTexture2D( this, () => {
      return gl.getParameter( pname );
    } );
  }

  /**
   * Specify the pixel storage modes.
   * See: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/pixelStorei
   */
  public pixelStorei( pname: GLenum, param: number | boolean ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindTexture2D( this, () => {
      gl.pixelStorei( pname, param );
    } );
  }

  /**
   * Set new data into this texture.
   */
  public setTexture( source: TexImageSource ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindTexture2D( this, () => {
      gl.texImage2D( GL_TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source );
    } );

    this.__width = source.width;
    this.__height = source.height;
  }

  /**
   * Set new data into this texture.
   * This function uses TypedArray. If you want to source image data, use `GLCat.setTexture()` instead.
   */
  public setTextureFromArray(
    width: number,
    height: number,
    source: ArrayBufferView | null,
    {
      internalformat = GL_RGBA8,
      format = GL_RGBA,
      type = GL_UNSIGNED_BYTE
    } = {}
  ): void {
    const { gl } = this.__glCat;

    let iformat = internalformat;
    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      // Ref: https://github.com/mrdoob/three.js/pull/15502/files
      if (
        internalformat === GL_R16F
        || internalformat === GL_R32F
        || internalformat === GL_RGBA16F
        || internalformat === GL_RGBA32F
      ) {
        this.__glCat.getExtension( 'EXT_color_buffer_float', true );
        this.__glCat.getExtension( 'EXT_float_blend' );
        this.__glCat.getExtension( 'OES_texture_float_linear' );
      }
    } else {
      if ( type === GL_HALF_FLOAT ) {
        this.__glCat.getExtension( 'OES_texture_half_float', true );
        this.__glCat.getExtension( 'OES_texture_half_float_linear' );
      } else if ( type === GL_FLOAT ) {
        this.__glCat.getExtension( 'OES_texture_float', true );
        this.__glCat.getExtension( 'OES_texture_float_linear' );
      }

      iformat = format;
    }

    this.__glCat.bindTexture2D( this, () => {
      gl.texImage2D(
        GL_TEXTURE_2D,
        0,
        iformat,
        width,
        height,
        0,
        format,
        type,
        source
      );
    } );

    this.__width = width;
    this.__height = height;
  }

  /**
   * Copy pixels from current framebuffer to given texture.
   */
  public copyTexture( width: number, height: number ): void {
    const { gl } = this.__glCat;

    this.__glCat.bindTexture2D( this, () => {
      gl.copyTexImage2D( GL_TEXTURE_2D, 0, GL_RGBA, 0, 0, width, height, 0 );
    } );

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

    this.__glCat.bindTextureCubeMap( this, () => {
      for ( let i = 0; i < 6; i ++ ) {
        gl.texImage2D(
          GL_TEXTURE_CUBE_MAP_POSITIVE_X + i,
          0,
          GL_RGBA,
          GL_RGBA,
          GL_UNSIGNED_BYTE,
          textures[ i ]
        );
      }
      gl.texParameteri( GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_LINEAR );
      gl.texParameteri( GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_LINEAR );
      gl.texParameteri( GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE );
      gl.texParameteri( GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE );
    } );
  }

  /**
   * Set [ 0, 0, 0, 0 ] to this texture.
   * Useful for temporary use..
   */
  public setZeroTexture(): void {
    this.setTextureFromArray( 1, 1, zeroTextureArray );
  }
}
