import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export class encryptionUtills {
  private static password = 'Password used to generate key';

  public static async encrypt(textToEncrypt: string): Promise<string> {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]).toString('hex');

    return `${iv.toString('hex')}:${encryptText}`;
  }

  public static async decrypt(encryptedText: string): Promise<string> {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedData = Buffer.from(textParts.join(':'), 'hex');

    const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    return Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]).toString();
  }
}
