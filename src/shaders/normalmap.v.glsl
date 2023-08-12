out vec2 UV;
out vec3 v_fragPos;
out vec3 v_normal;
out vec3 v_lightPos;


void main()
{
    vec3 lightPos = vec3(2,2,3);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_normal = normalMatrix * normal;
    v_fragPos = vec3(modelViewMatrix * vec4(position, 1.0));
    v_lightPos = vec3(viewMatrix * vec4(lightPos, 1.0)); 
    UV = uv;
}