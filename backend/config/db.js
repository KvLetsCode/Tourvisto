import mongoose from "mongoose";

const db = async () => {
    try {
        mongoose.connection.on('connected',() => console.log('Database connected')
        )
        await mongoose.connect(`${process.env.MONGO_URI}/AIdb`)
    } catch (error) {
        console.log(error);
        
    }
} 

export default db