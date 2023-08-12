// #version 300 es 

precision mediump float;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;

// in vec3 position;  

out vec2 UV;



void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  // vec4 texCoords = vec4(position, 1.0);
  // float a = atan(-texCoords.z, texCoords.x);
	// float r = sqrt(pow(texCoords.x,2.)+pow(texCoords.y,2.)+pow(texCoords.z,2.));
  // float b = acos(-texCoords.y/r);
  // UV = vec2((3.14+a)/(2.0* 3.14), b/3.14);

    vec4 texCoords = normalize(vec4(position, 1.0));
    float PI = 3.14;
    float u = (PI + atan(texCoords.z,texCoords.x))/(2.0*PI);
    float v = atan(sqrt(pow(texCoords.x,2.0)+pow(texCoords.z,2.0)),-texCoords.y)/PI;
    UV = vec2(1.0-u,v);

}


