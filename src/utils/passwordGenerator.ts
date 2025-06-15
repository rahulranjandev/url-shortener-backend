import { randomBytes } from 'crypto';

/**
 * Generates a cryptographically secure random password with the given length.
 * The password includes uppercase, lowercase, digits, and special characters.
 * @param length Number of characters in the password (default: 12)
 * @returns Randomly generated password string
 */
export function generatePassword(length: number = 12): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const specials = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  const all = upper + lower + digits + specials;

  if (length < 4) {
    throw new Error('Password length should be at least 4');
  }

  // Ensure at least one character from each set
  const getRandomChar = (charset: string) =>
    charset[cryptoRandomInt(charset.length)];

  let password = [
    getRandomChar(upper),
    getRandomChar(lower),
    getRandomChar(digits),
    getRandomChar(specials),
  ];

  for (let i = 4; i < length; i++) {
    password.push(getRandomChar(all));
  }

  // Secure shuffle using Fisher-Yates and crypto
  for (let i = password.length - 1; i > 0; i--) {
    const j = cryptoRandomInt(i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
}

/**
 * Returns a cryptographically secure random integer in [0, max)
 */
function cryptoRandomInt(max: number): number {
  if (max <= 0 || max > 256) throw new Error('max must be in (0, 256]');
  let rand: number;
  do {
    rand = randomBytes(1)[0];
  } while (rand >= 256 - (256 % max));
  return rand % max;
}