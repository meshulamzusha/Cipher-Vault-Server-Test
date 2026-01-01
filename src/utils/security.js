function reversCipher(text) {
    const reversedCharList = [...text].reverse();
    const encrypted = reversedCharList.map(char => 
        char.toUpperCase()).join("")
    
    return encrypted
}


function decryptReverse(text) {
    const reversedCharList = [...text].reverse();
    const decrypted = reversedCharList.map(char => 
        char.toLowerCase()).join("")
    
    return decrypted
}


export function encrypt(cipherType, text) {
    if (cipherType.toUpperCase() == 'REVERSE') {
        return reversCipher(text)
    }
}


export function decrypt(cipherType, text) {
    if (cipherType.toUpperCase() == 'REVERSE') {
        return decryptReverse(text)
    }
}
