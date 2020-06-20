import WebGL = require( 'gl' );
import { GLCat } from '../GLCat';
import { GLCatBuffer } from '../GLCatBuffer';

describe( 'GLCatProgram', () => {
  let gl: WebGLRenderingContext;
  let glCat: GLCat<WebGLRenderingContext>;
  let buffer: GLCatBuffer<WebGLRenderingContext>;

  beforeAll( () => {
    gl = WebGL( 300, 150 );
    glCat = new GLCat( gl );
  } );

  afterAll( () => {
    const ext = gl.getExtension( 'STACKGL_destroy_context' );
    ext.destroy();
  } );

  it( 'should be instantiated via glCat.createBuffer', () => {
    const tempBuffer = glCat.createBuffer();
    expect( tempBuffer ).not.toBeNull();
    buffer = tempBuffer!;
  } );

  describe( 'getBuffer', () => {
    it ( 'should return its own WebGLBuffer', () => {
      expect( buffer.raw ).not.toBeNull();
    } );
  } );
} );
