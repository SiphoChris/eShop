import { createPool } from "mysql2";
import 'dotenv/config'

const connection = createPool({
    host: process.env.DBHost,
    user: process.env.DBUser,
    password: process.env.DBPassword,
    database: process.env.DBName,
    multipleStatements: true,
    connectionLimit: 30
});

connection.on('connection', (pool) => {
    if(!pool) throw new Error('Database connection failed');
})

export {connection}