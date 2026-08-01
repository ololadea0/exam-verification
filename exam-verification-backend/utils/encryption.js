import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const algorithm = 'aes-256-cbc';
const fallbackKey = '0000000000000000000000000000000000000000000000000000000000000000';
const encryptionKey = process.env.ENCRYPTION_KEY || fallbackKey;
const key = Buffer.from(encryptionKey, 'hex');

if (key.length !== 32)
{
    throw new Error("ENCRYPTION_KEY must be a 64-character hex string");
}

export const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        encryptedEmbedding: encrypted,
        iv: iv.toString('hex')
    };
};

export const decrypt = (encryptedData, encryptionIv) => {
    const ivBuffer = Buffer.from(encryptionIv, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
