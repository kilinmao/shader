// #version 300 es 

precision mediump float;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;


// in vec2 uv;
// in vec3 position;  

out vec2 UV;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  UV = uv;
}


