export const createRandomString = (uniqueIdentifier: number): string => {
    return clamp(Math.random(), 0.01, 0.99).toString(36).slice(2, 7) + uniqueIdentifier;
}

export const clamp = (n: number, min: number, max: number): number => {
    return Math.min(Math.max(n, min), max);
}