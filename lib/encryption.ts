import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-32-character-key-for-dev'
const ALGORITHM = 'aes-256-gcm'

export function encrypt(text: string): string {
  try {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY)
    
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    return iv.toString('hex') + ':' + encrypted
  } catch (error) {
    console.error('Encryption failed:', error)
    return text // Return original text if encryption fails
  }
}

export function decrypt(encryptedText: string): string {
  try {
    if (!encryptedText.includes(':')) {
      // If not encrypted format, return as-is (for backward compatibility)
      return encryptedText
    }
    
    const [ivHex, encrypted] = encryptedText.split(':')
    const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  } catch (error) {
    console.error('Decryption failed:', error)
    return encryptedText // Return encrypted text if decryption fails
  }
}

export function maskSecret(secret: string): string {
  if (!secret || secret.length <= 8) return '***'
  return secret.substring(0, 4) + '***' + secret.substring(secret.length - 4)
}

export function generateApiKey(): string {
  return 'lv_' + crypto.randomBytes(32).toString('hex')
}

export function generateWebhookSecret(): string {
  return 'whsec_' + crypto.randomBytes(32).toString('hex')
}
