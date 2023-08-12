// #version 300 es

precision mediump float;

uniform sampler2D myTexture;
uniform sampler2D widTexture;
uniform sampler2D normalTexture;

in vec3 v_fragPos;
in vec3 v_lightPos;
in vec2 UV;

// out vec4 fragColor;



void main()
{


    vec3 ambientColor = texture(myTexture, UV).rgb + texture(widTexture, UV).rgb;
    vec3 diffColor =  texture(myTexture, UV).rgb + texture(widTexture, UV).rgb;

    float ambientReflectance = 0.2;
    float diffReflectance =1.0;
    vec3 specColor = vec3(1,1,1);
    float specReflectance = 0.25;
    float shininess = 50.;

    // ambient
    vec3 ambient = ambientReflectance * ambientColor;    
    
     // diffuse 
    vec3 norm = texture(normalTexture, UV).rgb;
    norm = normalize(norm * 2.0 - 1.0);
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