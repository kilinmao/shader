// #version 300 es

precision mediump float;

// Interpolated values from the vertex shaders
in vec4 texCoords;
in float v;


// Ouput data
// out vec3 color;

// Values that stay constant for the whole mesh.
uniform sampler2D myTexture;
uniform sampler2D widTexture;



void main(){

    // float a = atan(-texCoords.z, texCoords.x);
	// float r = sqrt(pow(texCoords.x,2.)+pow(texCoords.y,2.)+pow(texCoords.z,2.));
    // float b = acos(-texCoords.y/r);
    // vec2 UV = vec2((3.14+a)/(2.0* 3.14), b/3.14);
    float PI = 3.14;
    float u = (PI + atan(texCoords.z,texCoords.x))/(2.0*PI);
    vec2 UV = vec2(1.0-u,v);
    vec3 color = texture(myTexture, UV).rgb + texture(widTexture, UV).rgb;
    gl_FragColor = vec4(color, 1.0);
}

