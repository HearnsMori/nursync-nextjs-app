`/**
 * Defines the structure of the encrypted data payload.
 */
export interface EncryptedPayload {
  cipherText: string;
  iv: string;         // Base64 encoded Initialization Vector
  salt: string;       // Base64 encoded PBKDF2 Salt
}

// --- Configuration for Faster Performance ---
const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
// WARNING: Reduced from 100,000 to 10,000 for speed. This significantly weakens passphrase security.
const PBKDF2_ITERATIONS = 10000; 
const HASH_ALGORITHM = 'SHA-256';
const SALT_LENGTH = 16;
// --- End Config ---

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

// Helper to convert ArrayBuffer/Uint8Array to Base64
const bufferToBase64 = (buffer: ArrayBuffer | Uint8Array): string => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

// Helper to convert Base64 back to Uint8Array (the source of the previous error for some environments)
const base64ToBuffer = (base64: string): Uint8Array => {
  // The 'Array.from(atob(...))' pattern is a robust way to handle this conversion.
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
};

/**
 * Derives a cryptographic key from a user passphrase and salt using PBKDF2.
 */
const deriveKey = async (passphrase: string, salt: Uint8Array): Promise<CryptoKey> => {
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    textEncoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: PBKDF2_ITERATIONS,
      hash: HASH_ALGORITHM,
    },
    keyMaterial,
    { name: ALGORITHM, length: KEY_LENGTH },
    true,
    ['encrypt', 'decrypt']
  );
};

// --- Public API ---

/**
 * End-to-End Encrypts a string using a passphrase.
 */
export const e2eEncryptLite = async (data: string, passphrase: string): Promise<EncryptedPayload> => {
  if (typeof window === 'undefined' || !window.crypto) {
    throw new Error('E2E encryption requires the Web Cryptography API and a client environment.');
  }

  // 1. Derive Key
  const salt = window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const key = await deriveKey(passphrase, salt);

  // 2. Encrypt Data (AES-GCM)
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: ALGORITHM, iv: iv },
    key,
    textEncoder.encode(data)
  );
  
  // 3. Package and Encode
  return {
    cipherText: bufferToBase64(encryptedBuffer),
    iv: bufferToBase64(iv),
    salt: bufferToBase64(salt),
  };
};

/**
 * End-to-End Decrypts a previously encrypted object using the same passphrase.
 */
export const e2eDecryptLite = async (encryptedObject: EncryptedPayload, passphrase: string): Promise<string> => {
  if (typeof window === 'undefined' || !window.crypto) {
    throw new Error('E2E decryption requires the Web Cryptography API and a client environment.');
  }
  
  // 1. Decode Metadata
  const salt = base64ToBuffer(encryptedObject.salt);
  const iv = base64ToBuffer(encryptedObject.iv);

  // 2. Derive Key
  const key = await deriveKey(passphrase, salt);

  // 3. Decrypt Data
  const buffer = base64ToBuffer(encryptedObject.cipherText);
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: ALGORITHM, iv: iv },
    key,
    buffer
  );

  return textDecoder.decode(decryptedBuffer);
};`