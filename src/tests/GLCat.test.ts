import WebGL from 'gl';
import { GLCat } from '../GLCat';

describe( 'GLCat', () => {
  let gl: WebGLRenderingContext;
  let glCat: GLCat;

  beforeAll( () => {
    gl = WebGL( 300, 150 );
  } );

  afterAll( () => {
    const ext = gl.getExtension( 'STACKGL_destroy_context' );
    ext.destroy();
  } );

  it( 'should be instantiated', () => {
    glCat = new GLCat( gl );
    expect( glCat ).toBeInstanceOf( GLCat );
  } );

  describe( 'getExtension', () => {
    it( 'should retrieve a WebGL extension', () => {
      const ext = glCat.getExtension( 'ANGLE_instanced_arrays' );
      expect( ext ).not.toBeNull();
    } );

    it( 'should throw an error when attempt to retrieve unsupported WebGL extension', () => {
      expect( () => {
        glCat.getExtension( 'FMS_Cat\'s original extension!!!!', true );
      } ).toThrow();
    } );
  } );

  describe( 'getExtensions', () => {
    it( 'should deal with WebGL extensions', () => {
      const exts = glCat.getExtensions( [
        'OES_texture_float',
        'OES_element_index_uint',
        'OES_realtime_pathtracing_pipeline'
      ] );
      expect( exts.length ).toBe( 3 );
      expect( exts[ 0 ] ).not.toBeNull();
      expect( exts[ 1 ] ).not.toBeNull();
      expect( exts[ 2 ] ).toBeNull();
    } );

    it( 'should throw an error when attempt to retrieve unsupported WebGL extension', () => {
      expect( () => {
        glCat.getExtensions( [
          'OES_texture_float',
          'OES_element_index_uint',
          'h'
        ], true );
      } ).toThrow();
    } );
  } );

  describe( 'createShader', () => {
    it ( 'should create a new shader object', () => {
      const shader = glCat.createShader( gl.VERTEX_SHADER );
      expect( shader ).not.toBeNull();
    } );
  } );

  describe( 'createProgram', () => {
    it ( 'should create a new program object', () => {
      const program = glCat.createProgram();
      expect( program ).not.toBeNull();
    } );
  } );
} );
