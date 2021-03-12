import { GLCatProgram, GLCatProgramLinkOptions } from './GLCatProgram';
import { GL_ARRAY_BUFFER, GL_BLEND, GL_COLOR_ATTACHMENT0, GL_COLOR_BUFFER_BIT, GL_DEPTH_ATTACHMENT, GL_DEPTH_BUFFER_BIT, GL_DEPTH_COMPONENT16, GL_DEPTH_COMPONENT24, GL_DEPTH_TEST, GL_DRAW_FRAMEBUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_FLOAT, GL_FRAGMENT_SHADER, GL_FRAMEBUFFER, GL_LEQUAL, GL_MAX_DRAW_BUFFERS, GL_NEAREST, GL_ONE_MINUS_SRC_ALPHA, GL_READ_FRAMEBUFFER, GL_RENDERBUFFER, GL_RGBA, GL_RGBA32F, GL_RGBA8, GL_SRC_ALPHA, GL_TEXTURE_2D, GL_TEXTURE_CUBE_MAP, GL_TRANSFORM_FEEDBACK, GL_VERTEX_SHADER } from './GLConstants';
import { BindHelper } from './utils/BindHelper';
import { GLCatBuffer } from './GLCatBuffer';
import { GLCatErrors } from './GLCatErrors';
import { GLCatFramebuffer } from './GLCatFramebuffer';
import { GLCatRenderbuffer } from './GLCatRenderbuffer';
import { GLCatShader } from './GLCatShader';
import { GLCatTexture } from './GLCatTexture';
import { GLCatTransformFeedback } from './GLCatTransformFeedback';
import { GLCatVertexArray } from './GLCatVertexArray';

type WebGL1 = WebGLRenderingContext;
type WebGL2 = WebGL2RenderingContext;

export type WebGLExtension = any;

export type GLCatVertexArrayRawType<TContext extends WebGL1 | WebGL2 = WebGL1 | WebGL2>
  = TContext extends WebGL2
    ? WebGLVertexArrayObject
    : WebGLVertexArrayObjectOES;

/**
 * WebGL wrapper with plenty of hackability.
 */
export class GLCat<TContext extends WebGL1 | WebGL2 = WebGL1 | WebGL2> {
  public static throwIfNull<T>( v: T | null ): T {
    if ( v == null ) {
      throw GLCatErrors.UnexpectedNullError;
    } else {
      return v;
    }
  }

  public preferredMultisampleSamples = 4;

  public preferredDepthFormat: GLenum; // will be set in constructor

  private __gl: TContext;

  private __bindHelperVertexBuffer = new BindHelper<GLCatBuffer<TContext> | null>(
    null,
    ( buffer ) => {
      const gl = this.__gl;
      gl.bindBuffer( GL_ARRAY_BUFFER, buffer?.raw ?? null );
    }
  );

  private __bindHelperIndexBuffer = new BindHelper<GLCatBuffer<TContext> | null>(
    null,
    ( buffer ) => {
      const gl = this.__gl;
      gl.bindBuffer( GL_ELEMENT_ARRAY_BUFFER, buffer?.raw ?? null );
    }
  );

  private __bindHelperTransformFeedback = new BindHelper<GLCatTransformFeedback<TContext> | null>(
    null,
    ( buffer ) => {
      const gl = this.__gl;

      if (
        typeof WebGL2RenderingContext === 'function' &&
        gl instanceof WebGL2RenderingContext
      ) {
        gl.bindTransformFeedback( GL_TRANSFORM_FEEDBACK, buffer?.raw ?? null );
      } else {
        throw GLCatErrors.WebGL2ExclusiveError;
      }
    }
  );

  private __bindHelperVertexArray = new BindHelper<GLCatVertexArray<TContext> | null>(
    null,
    ( vertexArray ) => {
      this.rawBindVertexArray( vertexArray?.raw ?? null );
    }
  );

  private __bindHelperTexture2D = new BindHelper<GLCatTexture<TContext> | null>(
    null,
    ( texture ) => {
      const gl = this.__gl;
      gl.bindTexture( GL_TEXTURE_2D, texture?.raw ?? null );
    }
  );

  private __bindHelperTextureCubeMap = new BindHelper<GLCatTexture<TContext> | null>(
    null,
    ( texture ) => {
      const gl = this.__gl;
      gl.bindTexture( GL_TEXTURE_CUBE_MAP, texture?.raw ?? null );
    }
  );

  private __bindHelperRenderbuffer = new BindHelper<GLCatRenderbuffer<TContext> | null>(
    null,
    ( renderbuffer ) => {
      const gl = this.__gl;
      gl.bindRenderbuffer( GL_RENDERBUFFER, renderbuffer?.raw ?? null );
    }
  );

  private __bindHelperFramebuffer = new BindHelper<GLCatFramebuffer<TContext> | null>(
    null,
    ( framebuffer ) => {
      const gl = this.__gl;
      gl.bindFramebuffer( GL_FRAMEBUFFER, framebuffer?.raw ?? null );
    }
  );

  private __bindHelperProgram = new BindHelper<GLCatProgram<TContext> | null>(
    null,
    ( program ) => {
      const gl = this.__gl;
      gl.useProgram( program?.raw ?? null );
    }
  );

  private __bindHelperDrawBuffers = new BindHelper<GLenum[]>(
    [ GL_COLOR_ATTACHMENT0 ],
    ( buffers ) => {
      this.rawDrawBuffers( buffers );
    }
  );

  private __extensionCache: { [ name: string ]: WebGLExtension } = {};
  private __dummyTextureCache?: GLCatTexture<TContext>;

  /**
   * Its own rendering context.
   */
  public get renderingContext(): TContext {
    return this.__gl;
  }

  /**
   * Its own rendering context. Shorter than [[GLCat.renderingContext]]
   */
  public get gl(): TContext {
    return this.__gl;
  }

  /**
   * Create a new GLCat instance.
   * Rendering context is required.
   */
  public constructor( gl: TContext ) {
    this.__gl = gl;

    gl.enable( GL_DEPTH_TEST );
    gl.depthFunc( GL_LEQUAL );
    gl.enable( GL_BLEND );
    gl.blendFunc( GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA );

    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      this.preferredDepthFormat = GL_DEPTH_COMPONENT24;
    } else {
      this.preferredDepthFormat = GL_DEPTH_COMPONENT16;
    }
  }

  /**
   * A dummy texture, 100% organic pure #FF00FF texture.
   */
  public get dummyTexture(): GLCatTexture<TContext> {
    if ( this.__dummyTextureCache ) {
      return this.__dummyTextureCache;
    }

    const texture = this.createTexture();

    texture.setTextureFromArray( 1, 1, new Uint8Array( [ 255, 0, 255, 255 ] ) );
    this.__dummyTextureCache = texture;
    return texture;
  }

  /**
   * Retrieve an extension.
   * If they is your precious one and you cannot live without him, turn on `throwIfNotFound`.
   */
  public getExtension(
    name: 'OES_texture_half_float',
    throwIfNotFound?: false
  ): OES_texture_half_float | null;
  public getExtension(
    name: 'OES_texture_half_float',
    throwIfNotFound: true
  ): OES_texture_half_float;
  public getExtension(
    name: 'OES_texture_half_float_linear',
    throwIfNotFound?: false
  ): OES_texture_half_float_linear | null;
  public getExtension(
    name: 'OES_texture_half_float_linear',
    throwIfNotFound: true
  ): OES_texture_half_float_linear;
  public getExtension(
    name: 'OES_texture_float',
    throwIfNotFound?: false
  ): OES_texture_float | null;
  public getExtension(
    name: 'OES_texture_float',
    throwIfNotFound: true
  ): OES_texture_float;
  public getExtension(
    name: 'OES_texture_float_linear',
    throwIfNotFound?: false
  ): OES_texture_float_linear | null;
  public getExtension(
    name: 'OES_texture_float_linear',
    throwIfNotFound: true
  ): OES_texture_float_linear;
  public getExtension(
    name: 'ANGLE_instanced_arrays',
    throwIfNotFound?: false
  ): ANGLE_instanced_arrays | null;
  public getExtension(
    name: 'ANGLE_instanced_arrays',
    throwIfNotFound: true
  ): ANGLE_instanced_arrays;
  public getExtension(
    name: 'OES_vertex_array_object',
    throwIfNotFound?: false
  ): OES_vertex_array_object | null;
  public getExtension(
    name: 'OES_vertex_array_object',
    throwIfNotFound: true
  ): OES_vertex_array_object;
  public getExtension(
    name: 'WEBGL_draw_buffers',
    throwIfNotFound?: false
  ): WEBGL_draw_buffers | null;
  public getExtension(
    name: 'WEBGL_draw_buffers',
    throwIfNotFound: true
  ): WEBGL_draw_buffers;
  public getExtension( name: string, throwIfNotFound?: boolean ): WebGLExtension | null;
  public getExtension( name: string, throwIfNotFound?: boolean ): WebGLExtension | null {
    const gl = this.__gl;

    if ( this.__extensionCache[ name ] ) {
      return this.__extensionCache[ name ];
    } else {
      this.__extensionCache[ name ] = gl.getExtension( name );
      if ( this.__extensionCache[ name ] ) {
        return this.__extensionCache[ name ];
      } else {
        if ( throwIfNotFound ) {
          throw new Error( 'GLCat.getExtension: The extension "' + name + '" is not supported' );
        }
        return null;
      }
    }
  }

  /**
   * Retrieve extensions.
   * If they are your precious ones and you cannot live without them, turn on `throwIfNotFound`.
   */
  public getExtensions( names: string[], throwIfNotFound?: boolean ): Array<WebGLExtension | null> {
    return names.map( ( n ) => this.getExtension( n, throwIfNotFound ) );
  }

  /**
   * Create a new shader object.
   */
  public createShader( type: number ): GLCatShader<TContext> {
    const gl = this.__gl;

    const shader = GLCat.throwIfNull( gl.createShader( type ) );

    return new GLCatShader( this, shader );
  }

  /**
   * Create a new GLCat program object.
   */
  public createProgram(): GLCatProgram<TContext> {
    const gl = this.__gl;

    const program = GLCat.throwIfNull( gl.createProgram() );

    return new GLCatProgram( this, program );
  }

  /**
   * Create a new GLCat program object, in lazier way.
   */
  public lazyProgram(
    vert: string,
    frag: string,
    options: GLCatProgramLinkOptions = {},
  ): GLCatProgram<TContext> {
    let vertexShader: GLCatShader<TContext> | undefined;
    let fragmentShader: GLCatShader<TContext> | undefined;
    let program: GLCatShader<TContext> | undefined;

    try {
      // == vert ===================================================================================
      vertexShader = this.createShader( GL_VERTEX_SHADER );
      vertexShader.compile( vert );

      // == frag ===================================================================================
      const fragmentShader = this.createShader( GL_FRAGMENT_SHADER );
      fragmentShader.compile( frag );

      // == program ================================================================================
      const program = this.createProgram();
      program.link( [ vertexShader, fragmentShader ], options );

      // == almost done ============================================================================
      return program;
    } catch ( e ) {
      program?.dispose();
      fragmentShader?.dispose();
      vertexShader?.dispose();
      throw e;
    }
  }

  /**
   * Create a new GLCat program object, in lazier way.
   * It's gonna be asynchronous if you have the KHR_parallel_shader_compile extension support.
   */
  public lazyProgramAsync(
    vert: string,
    frag: string,
    options: GLCatProgramLinkOptions = {},
  ): Promise<GLCatProgram<TContext>> {
    let vertexShader: GLCatShader<TContext> | undefined;
    let fragmentShader: GLCatShader<TContext> | undefined;
    let program: GLCatShader<TContext> | undefined;

    try {
      // == vert ===================================================================================
      const vertexShader = this.createShader( GL_VERTEX_SHADER );
      vertexShader.compile( vert );

      // == frag ===================================================================================
      const fragmentShader = this.createShader( GL_FRAGMENT_SHADER );
      fragmentShader.compile( frag );

      // == program ================================================================================
      const program = this.createProgram();
      return program.linkAsync( [ vertexShader, fragmentShader ], options ).then( () => {
        return program;
      } ).catch( ( e ) => {
        program?.dispose();
        fragmentShader?.dispose();
        vertexShader?.dispose();
        return Promise.reject( e );
      } );
    } catch ( e ) {
      program?.dispose();
      fragmentShader?.dispose();
      vertexShader?.dispose();
      return Promise.reject( e );
    }
  }

  /**
   * Specify a program to use.
   * If callback is provided, it will execute the callback immediately, and undo the usage after the callback.
   */
  public useProgram<T>(
    program: GLCatProgram<TContext> | null,
    callback?: ( program: GLCatProgram<TContext> | null ) => T
  ): T {
    return this.__bindHelperProgram.bind( program, callback );
  }

  /**
   * Create a new vertex buffer.
   */
  public createBuffer(): GLCatBuffer<TContext> {
    const gl = this.__gl;

    const buffer = GLCat.throwIfNull( gl.createBuffer() );

    return new GLCatBuffer( this, buffer );
  }

  /**
   * Bind a vertex buffer.
   * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
   */
  public bindVertexBuffer<T>(
    buffer: GLCatBuffer<TContext> | null,
    callback?: ( buffer: GLCatBuffer<TContext> | null ) => T
  ): T {
    return this.__bindHelperVertexBuffer.bind( buffer, callback );
  }

  /**
   * Bind an index buffer.
   * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
   */
  public bindIndexBuffer<T>(
    buffer: GLCatBuffer<TContext> | null,
    callback?: ( buffer: GLCatBuffer<TContext> | null ) => T
  ): T {
    return this.__bindHelperIndexBuffer.bind( buffer, callback );
  }

  /**
   * Create a new transform feedback.
   */
  public createTransformFeedback(): GLCatTransformFeedback<TContext> {
    const gl = this.__gl;

    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      const transformFeedback = GLCat.throwIfNull( gl.createTransformFeedback() );

      return new GLCatTransformFeedback( this, transformFeedback );
    } else {
      throw GLCatErrors.WebGL2ExclusiveError;
    }
  }

  /**
   * Bind a transform feedback.
   * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
   */
  public bindTransformFeedback<T>(
    transformFeedback: GLCatTransformFeedback<TContext> | null,
    callback?: ( transformFeedback: GLCatTransformFeedback<TContext> | null ) => T,
  ): T {
    return this.__bindHelperTransformFeedback.bind( transformFeedback, callback );
  }

  /**
   * Create a new vertex array.
   */
  public createVertexArray(): GLCatVertexArray<TContext> {
    const gl = this.__gl;

    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      const vertexArray = GLCat.throwIfNull( gl.createVertexArray() );

      return new GLCatVertexArray( this, vertexArray as any );
    } else {
      const ext = this.getExtension( 'OES_vertex_array_object', true );

      const vertexArray = GLCat.throwIfNull( ext.createVertexArrayOES() );

      return new GLCatVertexArray( this, vertexArray as any );
    }
  }

  /**
   * Wrapper of `gl.bindVertexArray`.
   *
   * {@link rawBindVertexArray} is better.
   */
  public rawBindVertexArray( array: GLCatVertexArrayRawType<TContext> | null ): void {
    const gl = this.__gl;

    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      gl.bindVertexArray( array );
    } else {
      const ext = this.getExtension( 'OES_vertex_array_object', true );
      ext.bindVertexArrayOES( array as any );
    }
  }

  /**
   * {@link rawBindVertexArray} but better.
   *
   * Bind a vertex array.
   * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
   */
  public bindVertexArray<T>(
    vertexArray: GLCatVertexArray<TContext> | null,
    callback?: ( vertexArray: GLCatVertexArray<TContext> | null ) => T
  ): T {
    return this.__bindHelperVertexArray.bind( vertexArray, callback );
  }

  /**
   * Create a new texture.
   */
  public createTexture(): GLCatTexture<TContext> {
    const gl = this.__gl;

    const texture = GLCat.throwIfNull( gl.createTexture() );

    return new GLCatTexture( this, texture );
  }

  /**
   * Bind a 2D texture.
   * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
   */
  public bindTexture2D<T>(
    texture: GLCatTexture<TContext> | null,
    callback?: ( texture: GLCatTexture<TContext> | null ) => T
  ): T {
    return this.__bindHelperTexture2D.bind( texture, callback );
  }

  /**
   * Bind a cubemap texture.
   * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
   */
  public bindTextureCubeMap<T>(
    texture: GLCatTexture<TContext> | null,
    callback?: ( texture: GLCatTexture<TContext> | null ) => T
  ): T {
    return this.__bindHelperTextureCubeMap.bind( texture, callback );
  }

  /**
   * Create a new renderbuffer.
   */
  public createRenderbuffer(): GLCatRenderbuffer<TContext> {
    const gl = this.__gl;

    const renderbuffer = GLCat.throwIfNull( gl.createRenderbuffer() );

    return new GLCatRenderbuffer( this, renderbuffer );
  }

  /**
   * Bind a renderbuffer.
   * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
   */
  public bindRenderbuffer<T>(
    renderbuffer: GLCatRenderbuffer<TContext> | null,
    callback?: ( renderbuffer: GLCatRenderbuffer<TContext> | null ) => T
  ): T {
    return this.__bindHelperRenderbuffer.bind( renderbuffer, callback );
  }

  /**
   * Create a new framebuffer.
   */
  public createFramebuffer(): GLCatFramebuffer<TContext> {
    const gl = this.__gl;

    const framebuffer = GLCat.throwIfNull( gl.createFramebuffer() );

    return new GLCatFramebuffer( this, framebuffer );
  }

  /**
   * Bind a framebuffer.
   * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
   */
  public bindFramebuffer<T>(
    framebuffer: GLCatFramebuffer<TContext> | null,
    callback?: ( framebuffer: GLCatFramebuffer<TContext> | null ) => T
  ): T {
    return this.__bindHelperFramebuffer.bind( framebuffer, callback );
  }

  /**
   * Create a new framebufer, in lazier way.
   */
  public lazyFramebuffer(
    width: number,
    height: number,
    {
      isFloat = false,
      depthFormat = this.preferredDepthFormat
    } = {}
  ): GLCatFramebuffer<TContext> {
    let texture: GLCatTexture<TContext> | undefined;
    let renderbuffer: GLCatRenderbuffer<TContext> | undefined;
    let framebuffer: GLCatFramebuffer<TContext> | undefined;

    try {
      // == framebuffer ============================================================================
      framebuffer = this.createFramebuffer();

      // == renderbuffer ===========================================================================
      renderbuffer = this.createRenderbuffer();
      renderbuffer.renderbufferStorage( width, height, { format: depthFormat } );
      framebuffer.attachRenderbuffer( renderbuffer, { attachment: GL_DEPTH_ATTACHMENT } );

      // == texture ================================================================================
      texture = this.createTexture();
      if ( isFloat ) {
        texture.setTextureFromArray(
          width,
          height,
          null,
          { internalformat: GL_RGBA32F, format: GL_RGBA, type: GL_FLOAT }
        );
      } else {
        texture.setTextureFromArray( width, height, null );
      }
      framebuffer.attachTexture( texture );

      // == almost done ============================================================================
      return framebuffer;
    } catch ( e ) {
      framebuffer?.dispose();
      texture?.dispose();
      renderbuffer?.dispose();
      throw e;
    }
  }

  /**
   * Create a new multisample framebuffer, in lazier way.
   */
  public lazyMultisampleFramebuffer(
    width: number,
    height: number,
    {
      samples = 4,
      isFloat = false,
      depthFormat = this.preferredDepthFormat,
      fallbackWebGL1 = true
    } = {}
  ): GLCatFramebuffer<TContext> {
    const gl = this.__gl;

    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      let texture: GLCatTexture<TContext> | undefined;
      let renderbufferDepth: GLCatRenderbuffer<TContext> | undefined;
      let renderbufferColor: GLCatRenderbuffer<TContext> | undefined;
      let framebuffer: GLCatFramebuffer<TContext> | undefined;

      try {
        // == framebuffer ==========================================================================
        framebuffer = this.createFramebuffer();

        // == renderbuffer depth ===================================================================
        renderbufferDepth = this.createRenderbuffer();
        renderbufferDepth.renderbufferStorageMultisample(
          width,
          height,
          { samples, format: depthFormat }
        );
        framebuffer.attachRenderbuffer( renderbufferDepth, { attachment: GL_DEPTH_ATTACHMENT } );

        // == renderbuffer color ===================================================================
        const renderbufferColor = this.createRenderbuffer();
        const colorFormat = isFloat ? GL_RGBA32F : GL_RGBA8;
        renderbufferColor.renderbufferStorageMultisample(
          width,
          height,
          { samples, format: colorFormat }
        );
        framebuffer.attachRenderbuffer( renderbufferColor, { attachment: GL_COLOR_ATTACHMENT0 } );

        // == almost done ==========================================================================
        return framebuffer;
      } catch ( e ) {
        framebuffer?.dispose();
        texture?.dispose();
        renderbufferColor?.dispose();
        renderbufferDepth?.dispose();
        throw e;
      }
    } else if ( fallbackWebGL1 ) {
      return this.lazyFramebuffer( width, height, { isFloat } );
    } else {
      throw GLCatErrors.WebGL2ExclusiveError;
    }
  }

  /**
   * Create a new draw buffers, in lazier way.
   * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
   */
  public lazyDrawbuffers(
    width: number,
    height: number,
    numBuffers: number,
    {
      isFloat = false,
      depthFormat = this.preferredDepthFormat
    } = {}
  ): GLCatFramebuffer<TContext> {
    if ( GL_MAX_DRAW_BUFFERS < numBuffers ) {
      throw new Error( 'GLCat: Maximum draw buffers count exceeded' );
    }

    const textures: GLCatTexture<TContext>[] = [];
    let renderbuffer: GLCatRenderbuffer<TContext> | undefined;
    let framebuffer: GLCatFramebuffer<TContext> | undefined;

    try {
      // == framebuffer ============================================================================
      framebuffer = this.createFramebuffer();

      // == renderbuffer ===========================================================================
      const renderbuffer = this.createRenderbuffer();
      renderbuffer.renderbufferStorage( width, height, { format: depthFormat } );
      framebuffer.attachRenderbuffer( renderbuffer, { attachment: GL_DEPTH_ATTACHMENT } );

      // == texture ================================================================================
      for ( let i = 0; i < numBuffers; i ++ ) {
        const texture = this.createTexture();
        if ( isFloat ) {
          texture.setTextureFromArray(
            width,
            height,
            null,
            { internalformat: GL_RGBA32F, format: GL_RGBA, type: GL_FLOAT }
          );
        } else {
          texture.setTextureFromArray( width, height, null );
        }
        framebuffer.attachTexture( texture, { attachment: GL_COLOR_ATTACHMENT0 + i } );
      }

      // == almost done ============================================================================
      return framebuffer;
    } catch ( e ) {
      textures.forEach( ( texture ) => {
        texture.dispose();
      } );
      renderbuffer?.dispose();
      framebuffer?.dispose();
      throw e;
    }
  }

  /**
   * Wrapper of `gl.drawBuffers`.
   *
   * {@link drawBuffers} is better.
   */
  public rawDrawBuffers( buffers: GLenum[] ): void {
    const gl = this.__gl;

    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      gl.drawBuffers( buffers );
    } else {
      const ext = this.getExtension( 'WEBGL_draw_buffers' );
      ext?.drawBuffersWEBGL( buffers );
    }
  }

  /**
   * {@link rawDrawBuffers} but better.
   *
   * Call this before you're gonna use draw buffers.
   * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
   * If callback is provided, it will execute the callback immediately, and undo the draw buffers after the callback.
   */
  public drawBuffers<T>(
    buffersOrNumBuffers?: GLenum[] | number,
    callback?: ( buffers: GLenum[] ) => T
  ): T {
    let buffers: GLenum[];

    if ( Array.isArray( buffersOrNumBuffers ) ) {
      buffers = buffersOrNumBuffers;
    } else if ( buffersOrNumBuffers ) {
      buffers = [];
      for ( let i = 0; i < buffersOrNumBuffers; i ++ ) {
        buffers[ i ] = GL_COLOR_ATTACHMENT0 + i;
      }
    } else {
      buffers = [ GL_COLOR_ATTACHMENT0 ];
    }

    return this.__bindHelperDrawBuffers.bind( buffers, callback );
  }

  /**
   * a wrapper of drawElementsInstanced.
   */
  public drawArraysInstanced(
    mode: GLenum,
    first: GLint,
    count: GLsizei,
    primcount: GLsizei
  ): void {
    const { gl } = this;

    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      gl.drawArraysInstanced( mode, first, count, primcount );
    } else {
      const ext = this.getExtension( 'ANGLE_instanced_arrays', true );
      ext.drawArraysInstancedANGLE( mode, first, count, primcount );
    }
  }

  /**
   * a wrapper of drawElementsInstanced.
   */
  public drawElementsInstanced(
    mode: GLenum,
    count: GLsizei,
    type: GLenum,
    offset: GLintptr,
    instanceCount: GLsizei
  ): void {
    const { gl } = this;

    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      gl.drawElementsInstanced( mode, count, type, offset, instanceCount );
    } else {
      const ext = this.getExtension( 'ANGLE_instanced_arrays', true );
      ext.drawElementsInstancedANGLE( mode, count, type, offset, instanceCount );
    }
  }

  /**
   * Clear the current framebuffer.
   */
  public clear(
    red = 0.0,
    green = 0.0,
    blue = 0.0,
    alpha = 1.0,
    depth = 1.0
  ): void {
    const gl = this.__gl;

    gl.clearColor( red, green, blue, alpha );
    gl.clearDepth( depth );
    gl.clear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );
  }

  /**
   * Basically just a `gl.blitFramebuffer`.
   */
  public blitFramebuffer(
    src: GLCatFramebuffer<TContext> | null,
    dst: GLCatFramebuffer<TContext> | null,
    {
      srcViewport = [ 0, 0, src?.renderbuffer?.width ?? 0, src?.renderbuffer?.height ?? 0 ],
      dstViewport = [ 0, 0, dst?.renderbuffer?.width ?? 0, dst?.renderbuffer?.height ?? 0 ],
      mask = GL_COLOR_BUFFER_BIT,
      filter = GL_NEAREST
    } = {}
  ): void {
    const gl = this.__gl;

    if (
      typeof WebGL2RenderingContext === 'function' &&
      gl instanceof WebGL2RenderingContext
    ) {
      gl.bindFramebuffer( GL_READ_FRAMEBUFFER, src?.raw ?? null );
      gl.bindFramebuffer( GL_DRAW_FRAMEBUFFER, dst?.raw ?? null );
      gl.blitFramebuffer(
        srcViewport[ 0 ],
        srcViewport[ 1 ],
        srcViewport[ 2 ],
        srcViewport[ 3 ],
        dstViewport[ 0 ],
        dstViewport[ 1 ],
        dstViewport[ 2 ],
        dstViewport[ 3 ],
        mask,
        filter
      );
      gl.bindFramebuffer( GL_READ_FRAMEBUFFER, null );
      gl.bindFramebuffer( GL_DRAW_FRAMEBUFFER, null );
    } else {
      throw GLCatErrors.WebGL2ExclusiveError;
    }
  }
}
