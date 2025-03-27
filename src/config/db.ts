import { Sequelize } from "sequelize-typescript"
import dotenv from 'dotenv'
dotenv.config()

console.log()

// Añadimos ! al final garantizas que el valor estará y no será UNDEFINED
const db = new Sequelize(process.env.DATABASE_URL!,{
    models: [__dirname + '/../models/**/*'],
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false   
})

export default db