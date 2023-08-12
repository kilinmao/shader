// #version 300 es

precision mediump float;

// Interpolated values from the vertex shaders
in vec3 v_position;
in vec3 v_normal;

// Ouput data
// out vec3 color;

// Values that stay constant for the whole mesh.
uniform sampler2D myTexture;
uniform sampler2D widTexture;
// uniform vec3 cameraPosition;

void main(){
    vec3 N = normalize(v_normal);
    vec3 E = normalize(cameraPosition-v_position); 
    // vec3 R = normalize(E - 2. * dot(E,N) * N);
    vec3 R = reflect(-E, N);

    float a = atan(-R.z, R.x);
	float r = sqrt(pow(R.x,2.)+pow(R.y,2.)+pow(R.z,2.));
    float b = acos(-R.y/r);
    vec2 UV = vec2(1.0-(3.14+a)/(2.0* 3.14), b/3.14);
    vec3 color = texture(myTexture, UV).rgb + texture(widTexture, UV).rgb;
    gl_FragColor = vec4(color, 1.0);
}

