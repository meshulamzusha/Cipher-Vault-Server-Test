export function createMessage(username, cipherType, encryptedText) {
    return {
        username: username,
        cipher_type: cipherType,
        encrypted_text: encryptedText
    }
}