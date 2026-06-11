/**
 * utils/binaryValidator.ts
 * Secure binary path validation and integrity checking
 */
/**
 * Security configuration for binary validation
 */
interface BinarySecurityConfig {
    expectedHash?: string;
    maxFileSize: number;
    allowedPaths: string[];
    requireAbsolutePath: boolean;
}
/**
 * Binary validation error
 */
export declare class BinaryValidationError extends Error {
    code: string;
    constructor(message: string, code: string);
}
/**
 * Validates binary path for security
 */
export declare function validateBinaryPath(binaryPath: string, config?: Partial<BinarySecurityConfig>): void;
/**
 * Calculates SHA256 hash of binary file
 */
export declare function calculateBinaryHash(binaryPath: string): string;
/**
 * Validates binary integrity using hash
 */
export declare function validateBinaryIntegrity(binaryPath: string, expectedHash: string): boolean;
/**
 * Comprehensive binary security validation
 */
export declare function validateBinarySecurity(binaryPath: string, config?: Partial<BinarySecurityConfig>): {
    isValid: boolean;
    hash?: string;
    errors: string[];
};
/**
 * Secure binary path finder with validation
 */
export declare function findSecureBinaryPath(possiblePaths: string[], config?: Partial<BinarySecurityConfig>): {
    path: string | null;
    validationResult?: ReturnType<typeof validateBinarySecurity>;
};
/**
 * Environment-specific binary validation
 */
export declare function getEnvironmentBinaryConfig(): Partial<BinarySecurityConfig>;
export {};
