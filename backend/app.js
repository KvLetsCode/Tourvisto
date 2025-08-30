import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/db.js'
import router from './routes/AIrouter.js'

dotenv.config()

await db()
const app = express()
// console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY);
    

app.use(express.json())
app.use(cors())

app.use('/api/v1',router)

const PORT = process.env.PORT
app.listen(PORT, () => (
    console.log("server running ")
    
))