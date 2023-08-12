precision mediump float;

out vec2 UV;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  UV = uv;
}


