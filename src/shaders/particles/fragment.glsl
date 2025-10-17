varying vec3 vColor;


void main() {

    vec2 uv = gl_PointCoord;

    float distanceToCenter = distance(uv, vec2(0.5)); // dark dot in the middle
    float alpha = 0.05 / distanceToCenter - 0.1; // very bright dot in the middle

    
    gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}