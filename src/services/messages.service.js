import { getSupabaseClient } from "../db/supabase.js";
import { connectMongoDBUsersCollection } from "../db/mongo.js";
import { createMessage } from "../models/message.model.js";
import { encrypt, decrypt } from "../utils/security.js"

const supabase = getSupabaseClient();
const collection = await connectMongoDBUsersCollection()

async function encryptService(username, cipherType, text) {
    try {
        const encrypted = encrypt(cipherType, text);
        const message = createMessage(username, cipherType, encrypted);

        const { data, error } = await supabase
            .from('messages')
            .insert(message)
            .select()
            .single()

        if (error) {
            throw error
        }

        if (data) {

            await collection.updateOne(
                { username: username },
                { $inc: { encryptedMessagesCount: 1 } }
            )

            return {
                id: data.id,
                cipherType: data.cipher_type,
                encryptedText: data.encrypted_text
            }
        }

    } catch (error) {
        throw error
    }
}


async function decryptService(messageId) {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select()
            .eq(id, messageId)
            .single()

        if (error) {
            throw new Error("Failed to retrieve information from the database.");
        }

        if (data) {
            if (data.cipherType.toUpperCase() == 'RANDOM_SHUFFLE') {
                return {
                    id: data.id,
                    decryptedText: null,
                    error: "CANNOT_DECRYPT"
                }
            }

            const decrypted = decrypt(data.cipher_type, data.encrypted_text)

            return {
                id: data.id,
                decryptedText: decrypted
            }
        }
    } catch (error) {
        throw error;
    }
}

export default {
    encryptService,
    decryptService
}
