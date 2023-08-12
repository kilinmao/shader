uniform vec3 ambientColor;
uniform float ambientReflectance;
uniform vec3 diffColor;
uniform float diffReflectance;
uniform vec3 specColor;
uniform float specReflectance;
uniform float shininess;

in vec3 v_fragPos;
in vec3 v_normal;
in vec3 v_lightPos;



void main()
{
    // ambient
    vec3 ambient = ambientReflectance * ambientColor;    
    
     // diffuse 
    vec3 norm = normalize(v_normal);
    vec3 lightDir = normalize(v_lightPos - v_fragPos);
    float diff = max(dot(norm, lightDir),0.0);
    vec3 diffuse = diffReflectance * diffColor * diff;

    // specular
    vec3 viewDir = normalize(-v_fragPos); // the viewer is always at (0,0,0) in view-space, so viewDir is (0,0,0) - Position => -Position
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = specReflectance * specColor * spec; 
    
    vec3 result = ambient + diffuse + specular;
    gl_FragColor = vec4(result, 1.0);
}