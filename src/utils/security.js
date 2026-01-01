function reversCipher(text) {
    const reversedCharList = [...text].reverse();
    const encrypted = reversedCharList.map(char => 
        char.toUpperCase()).join("")
    
    return encrypted
}

export function encrypt(cipherType, text) {
    if (cipherType.toUpperCase() == 'REVERSE') {
        return reversCipher(text)
    }
}
