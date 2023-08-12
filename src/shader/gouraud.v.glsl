uniform vec3 lightPos; 

uniform vec3 ambientColor;
uniform float ambientReflectance;
uniform vec3 diffColor;
uniform float diffReflectance;
uniform vec3 specColor;
uniform float specReflectance;
uniform float shininess;

out vec3 v_color;

void main(){

    // ambient
    vec3 ambient = ambientReflectance * ambientColor;    
    
     // diffuse 
    // vec3 N  = normalize(mat3(transpose(inverse(modelViewMatrix))) * normal);
    vec3 N  = normalize(normalMatrix * normal);
    vec3 fragPos = vec3(modelViewMatrix * vec4(position, 1.0));
    vec3 lightPos = vec3(viewMatrix* vec4(lightPos,1.0));
    vec3 L = normalize(lightPos - fragPos);
    float diff = max(dot(N, L),0.0);
    vec3 diffuse = diffReflectance * diffColor * diff;

    // specular
    vec3 E = normalize(cameraPosition - fragPos);
    vec3 R = normalize(reflect(-L, N));  
    float spec = pow(max(dot(R, E), 0.0), shininess);
    vec3 specular = specReflectance * specColor * spec; 

    v_color = ambient + diffuse + specular;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}