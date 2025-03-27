import express from "express"
import colors from 'colors'
import cors, { CorsOptions} from 'cors'
import morgan from 'morgan'
import router from "./router"
import db from "./config/db"

// Conectar a BD
async function connectDB() {
    console.log(colors.yellow(`Intentando conectar a BD: ${process.env.DATABASE_URL}`))
    try {
        await db.authenticate()
        await db.sync()
        console.log(colors.blue('Conexión exitosa a la BD'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.white('Hubo un error al conectar a la BD'))
        process.exit(1)
    }    
}
connectDB()

// Instancia de Express
const server = express()

console.log("FRONTEND_URL:", process.env.FRONTEND_URL)

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin:function(origin, callback){ 
        const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:4000']       
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true)
        } else{
            callback(new Error('Error de CORS'))
        } 
    }
}
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.get('/', (req, res) => {
    res.send('API funcionando correctamente')
})
server.use('/api/products', router)



export default server