uniform vec2 uResolution;
uniform float uSize;
uniform float uProgress;

attribute vec3 aPositionTarget;

varying vec3 vColor;

#include ../includes/simplexNoise3d.glsl

void main() {
    // mixed position
    // simplex noise ranges from -1 to 1
    float noiseOriginal = simplexNoise3d(position * 0.9);
    float noiseTarget = simplexNoise3d(aPositionTarget * 0.9);
    
    float noise = mix(noiseOriginal,noiseTarget, uProgress);
    // this remaps from 0->1 smoothly
    noise = smoothstep(-1.0, 1.0, noise);

    // this sets a range such that the animation from 0-1 only happens after a delayed period
    // goes for and explicit duration and finishs at and end
    // doing this will make it look like different particles start animating at differnet times 
    float duration = 0.2;
    float delay = (1.0 - duration) * noise;
    float end = delay + duration;

    // float progress = uProgress;

    float progress = smoothstep(delay,end,uProgress);
    vec3 mixedPosition = mix(position, aPositionTarget, progress);

    // Final position
    // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Point size
    gl_PointSize = uSize * uResolution.y;
    gl_PointSize *= (1.0 / -viewPosition.z);

    // since we are transformin the shape of all our points we can do this calc at a vertex level rather than fragment
    // aim particle with brigh center that dims as goin out

    // Varyings

    vColor = vec3(noise);

}