/**
 * Curried equality function. Primarily for use in Array.some(eq(valueToCompare))
 */
export const eq = <T>(a: T) => (b: T): boolean => a === b;

/**
 * Curried equality function. Primarilt for use in Array.every(notEq(valueToCheckFor))
 */
export const notEq = <T>(a: T) => (b: T): boolean => a !== b;
