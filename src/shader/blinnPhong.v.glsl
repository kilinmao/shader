

out vec3 v_fragPos;
out vec3 v_normal;
out vec3 v_lightPos;

uniform vec3 lightPos;


void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_normal = normalMatrix * normal;
    v_fragPos = vec3(modelViewMatrix * vec4(position, 1.0));
    v_lightPos = vec3(viewMatrix * vec4(lightPos, 1.0)); 
}
