export function createUser(username, password) {
    return {
        username: username,
        password: password,
        encryptedMessagesCount: 0,
        createdAt: new Date().toLocaleString()
    }
}