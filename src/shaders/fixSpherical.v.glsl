// #version 300 es 

precision mediump float;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform mat4 modelMatrix;
// in vec3 position;  

out vec4 texCoords;
out float v;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  texCoords =  vec4(position, 1.0);
  float PI = 3.14;
  v = atan(sqrt(pow(texCoords.x,2.0)+pow(texCoords.z,2.0)),-texCoords.y)/PI;
}


