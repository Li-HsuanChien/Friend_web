import mongoose, { Schema, model, connect} from 'mongoose'
import { MongoClient } from 'mongodb'
import { promises } from 'dns'
require('dotenv').config()

interface IPost{
    //post shape
    content: string,
    author: string
}

const postShema = new Schema<IPost>({
    content: {type: String, required: true},
    author: {type: String, required: true}
})

const Post = model<IPost>('Post', postShema) 

const connectToDb = async (): Promise<object> => {

    try {
        await connect(process.env.MongoURI!)
        console.log("connected to db!")
        return { status: 200, message: 'OK - Connected!'}
    } catch(err){
        console.log(err)
        return { status: 400, message: 'Bad request = Can not connect!'}
    }

}

export default connectToDb