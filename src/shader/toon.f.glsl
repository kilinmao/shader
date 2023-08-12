precision mediump float;

in vec3 v_normal;
in vec3 v_viewDir;


void main()
{

    float intensity = dot(normalize(v_viewDir),normalize(v_normal));
    vec4 fragColor;
    if (intensity > 0.95)
        fragColor = vec4(0.9, 0.05, 0.05, 1);
    else if (intensity > 0.7)
        fragColor = vec4(0.68, 0.13, 0.13, 1);
    else if (intensity > 0.25)
        fragColor = vec4(0.49, 0.1, 0.1, 1);    
    else
        fragColor = vec4(0.25, 0.07, 0.07, 1);

        gl_FragColor = fragColor;

}
