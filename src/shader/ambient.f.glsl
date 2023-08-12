precision highp float;

uniform vec3 ambientColor;
uniform float ambientReflectance;

void main()
{
  gl_FragColor = ambientReflectance * vec4(ambientColor,1.);
}