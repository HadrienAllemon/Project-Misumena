export function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

// Easing function (makes transition smooth)
export function easeInOutCubic(t: number) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}