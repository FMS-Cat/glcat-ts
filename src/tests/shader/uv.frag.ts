export default `precision highp float;

varying vec2 vUv;

uniform float blue;

void main() {
  gl_FragColor = vec4( vUv, blue, 1.0 );
}`;
