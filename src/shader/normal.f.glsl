precision mediump float;

in vec3 v_normal;


void main() {
  gl_FragColor = vec4((normalize(v_normal) + vec3(1.0, 1.0, 1.0))/2.0, 1.0);
}