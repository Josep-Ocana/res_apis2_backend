import express from "express"
import colors from 'colors'
import cors, { CorsOptions} from 'cors'
import morgan from 'morgan'
import router from "./router"
import db from "./config/db"

// Conectar a BD
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue('Conexión exitosa a la BD'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.white('Hubo un error al conectar a la BD'))
    }    
}
connectDB()

// Instancia de Express
const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin:function(origin, callback){        
        if(!origin || origin === process.env.FRONTEND_URL){
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
server.use('/api/products', router)



export default server