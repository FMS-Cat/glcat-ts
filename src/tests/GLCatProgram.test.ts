import WebGL from 'gl';
import { GLCat } from '../GLCat';
import { GLCatProgram } from '../GLCatProgram';
import sQuadVert from './shader/quad.vert';
import sUvFrag from './shader/uv.frag';
import { GLCatShader } from '../GLCatShader';

describe( 'GLCatProgram', () => {
  let gl: WebGLRenderingContext;
  let glCat: GLCat;
  let quadVert: GLCatShader;
  let uvFrag: GLCatShader;
  let program: GLCatProgram;

  beforeAll( () => {
    gl = WebGL( 300, 150 );
    glCat = new GLCat( gl );

    quadVert = glCat.createShader( gl.VERTEX_SHADER )!;
    quadVert.compile( sQuadVert );

    uvFrag = glCat.createShader( gl.FRAGMENT_SHADER )!;
    uvFrag.compile( sUvFrag );
  } );

  afterAll( () => {
    const ext = gl.getExtension( 'STACKGL_destroy_context' );
    ext.destroy();
  } );

  it( 'should be instantiated via glCat.createProgram', () => {
    const tempProgram = glCat.createProgram();
    expect( tempProgram ).not.toBeNull();
    program = tempProgram!;
  } );

  describe( 'getProgram', () => {
    it ( 'should return its own WebGLProgram', () => {
      expect( program.getProgram() ).not.toBeNull();
    } );
  } );

  describe( 'link', () => {
    it ( 'should link the WebGLProgram successfully', () => {
      program.link( quadVert, uvFrag );
      expect( program.isLinked() ).toBe( true );
    } );
  } );

  describe( 'getAttribLocation', () => {
    let locationP: number;
    it ( 'should return valid attribute location', () => {
      locationP = program.getAttribLocation( 'p' );
      expect( locationP ).toBeGreaterThanOrEqual( 0 );
    } );

    it ( 'should return same location as previous one', () => {
      const location = program.getAttribLocation( 'p' );
      expect( location ).toBe( locationP );
    } );

    it ( 'should return -1 if it receives undefined attribute name', () => {
      const location = program.getAttribLocation( 'normal' );
      expect( location ).toBe( -1 );
    } );
  } );

  describe( 'getUniformLocation', () => {
    let locationBlue: WebGLUniformLocation | null;
    it ( 'should return valid uniform location', () => {
      locationBlue = program.getUniformLocation( 'blue' );
      expect( locationBlue ).not.toBeNull();
    } );

    it ( 'should return same location as previous one', () => {
      const location = program.getUniformLocation( 'blue' );
      expect( location ).toBe( locationBlue );
    } );

    it ( 'should return null if it receives undefined uniform name', () => {
      const location = program.getUniformLocation( 'time' );
      expect( location ).toBeNull();
    } );
  } );
} );
