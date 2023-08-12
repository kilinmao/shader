// #version 300 es 

precision mediump float;

// uniform mat4 modelMatrix;
// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;


// in vec3 position;
// in vec3 normal;  

out vec3 v_position;
out vec3 v_normal;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_position = vec3(modelMatrix * vec4(position, 1.0));
  v_normal = mat3(transpose(inverse(modelMatrix))) * normal;


}


