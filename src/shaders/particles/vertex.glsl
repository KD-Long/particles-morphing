uniform vec2 uResolution;
uniform float uSize;

varying vec3 vColor;

void main() {

    // Final position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Point size
    gl_PointSize = uSize * uResolution.y;
    gl_PointSize *= (1.0 / -viewPosition.z);


    // since we are transformin the shape of all our points we can do this calc at a vertex level rather than fragment
    // aim particle with brigh center that dims as goin out


    // Varyings

    vColor = vec3(1.0, 0.0, 0.2);
    
}