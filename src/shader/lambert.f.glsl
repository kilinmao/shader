precision mediump float;

uniform vec3 ambientColor;
uniform float ambientReflectance;
uniform vec3 diffColor;
uniform float diffReflectance;
uniform vec3 lightPos;

in vec3 v_fragPos;
in vec3 v_normal;


void main()
{
    // ambient
    vec3 ambient = ambientReflectance * ambientColor;    
    vec4 fragColor;
    
     // diffuse 
    vec3 norm = normalize(v_normal);
    vec3 lightDir = normalize(lightPos - v_fragPos);
    float diff = dot(norm, lightDir);
    vec3 diffuse = diffReflectance * diffColor * diff;
    
    vec3 result = ambient + diffuse;
    fragColor = vec4(result, 1.0);
    gl_FragColor = fragColor;
}