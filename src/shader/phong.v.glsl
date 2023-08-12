out vec3 v_fragPos;
out vec3 v_normal;
out vec3 v_lightPos;

uniform vec3 lightPos; // we now define the uniform in the vertex shader and pass the 'view space' lightpos to the fragment shader. lightPos is currently in world space.

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_fragPos = vec3(modelViewMatrix * vec4(position, 1.0));
    v_normal = mat3(transpose(inverse(modelViewMatrix))) * normal;
    v_lightPos = vec3(viewMatrix * vec4(lightPos, 1.0)); // Transform world-space light position to view-space light position
}