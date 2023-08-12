precision mediump float;

out vec3 v_normal;

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    v_normal = mat3(transpose(inverse(modelMatrix))) * normal;
}