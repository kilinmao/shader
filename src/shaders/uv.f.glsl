precision mediump float;

// Interpolated values from the vertex shaders
in vec2 UV;

// Values that stay constant for the whole mesh.
uniform sampler2D myTexture;
uniform sampler2D widTexture;

void main(){

    // Output color = color of the texture at the specified UV
    vec3 color1 = texture(myTexture, UV).rgb;
    vec3 color2 = texture(widTexture, UV).rgb;
    gl_FragColor = vec4(color1+color2, 1.0);
}