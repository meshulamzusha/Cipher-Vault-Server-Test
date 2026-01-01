import { createUser } from "../models/user.model.js";
import { connectMongoDBUsersCollection } from "../db/mongo.js";

const collection = await connectMongoDBUsersCollection()

async function registerUserService(username, password) {
    try {
        if (await isUsernameUnique(username)) {
            const user = createUser(username, password);
            const result = await collection.insertOne(user);

            if (result.acknowledged) {
                return {
                    id: result.insertedId.toString(),
                    username: username
                }
            }
        }

    } catch (error) {
        throw error
    }
}


async function isUsernameUnique(username) {
    try {
        const user = await collection
            .findOne({ username: username })
        
        return user == undefined;

    } catch (error) {
        throw error
    }
}


async function getUserByUsername(username) {
    try {
        const user = await collection
            .findOne({username: username})

        return user

    } catch (error) {
        throw error
    }
}


export default {
    registerUserService,
    getUserByUsername
}