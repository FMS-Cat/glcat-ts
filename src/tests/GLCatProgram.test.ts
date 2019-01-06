import WebGL from 'gl';
import { GLCat } from '../GLCat';
import quadVert from './shader/quad.vert';
import uvFrag from './shader/uv.frag';

describe( 'GLCatProgram', () => {
  const gl = WebGL( 300, 150 ) as WebGLRenderingContext;
  const glCat = new GLCat( gl );
  const program = glCat.createProgram( quadVert, uvFrag );
  if ( program === null ) {
    throw new Error( 'wtf' );
  }

  describe( 'getProgram', () => {
    it ( 'should return its own WebGLProgram', () => {
      expect( program.getProgram() ).not.toBeNull();
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
