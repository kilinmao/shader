// #version 300 es

precision mediump float;

// Interpolated values from the vertex shaders
in vec2 UV;

// Ouput data
// out vec3 color;

// Values that stay constant for the whole mesh.
uniform sampler2D myTexture;
uniform sampler2D widTexture;

void main() {	
    vec3 color = texture(myTexture, UV).rgb + texture(widTexture, UV).rgb;
    gl_FragColor = vec4(color, 1.0);
}

