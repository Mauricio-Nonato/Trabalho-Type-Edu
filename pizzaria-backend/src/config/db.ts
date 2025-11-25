import sql from 'mssql';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config(); 

const dbConfig: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER || 'localhost',
    port: parseInt(process.env.DB_PORT || '1433'),
    options: {
        encrypt: false, 
        trustServerCertificate: true 
    }
};

const pool = new sql.ConnectionPool(dbConfig);
let poolPromise = pool.connect();

export async function getConnection(): Promise<sql.ConnectionPool> {
    await poolPromise;
    return pool;
}