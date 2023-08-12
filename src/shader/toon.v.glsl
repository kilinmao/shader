precision mediump float;

out vec3 v_normal;
out vec3 v_viewDir;

void main(){  

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    vec3 fragPos = vec3(modelViewMatrix * vec4(position,1.0));
    v_normal = normalMatrix * normal;
    v_viewDir =  - fragPos;

}