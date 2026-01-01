import { getSupabaseClient } from "../db/supabase.js";
import { connectMongoDBUsersCollection } from "../db/mongo.js";
import { createMessage } from "../models/message.model.js";
import { encrypt } from "../utils/security.js"

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

export default {
    encryptService
}
