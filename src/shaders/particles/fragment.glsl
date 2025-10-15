varying vec3 vColor;

void main() {

    vec2 uv = gl_PointCoord;

    float distanceToCenter = distance(uv, vec2(0.5));
    
     // generally try to avoid complex if statements in frag shader. 
    // they are slow and can cause performance issues (each pixel will be checked).
    if(distanceToCenter > 0.5) {
        discard; // this is a special keyword that discards the pixel (dont render it)
    }

    // Final color
    gl_FragColor = vec4(uv, 1.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}