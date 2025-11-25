import { getConnection } from "../config/db"; // Sem .js
import bcrypt from 'bcrypt';
import { Proprietario } from "../models/Propietario"; // Sem .js (assumindo que o arquivo existe)

export async function loginProprietario(username: string, password: string) {
    const pool = await getConnection();
    
    const result = await pool.request()
        .input('username', username)
        .query(`SELECT * FROM Proprietarios WHERE username=@username`);

    const prop: Proprietario = result.recordset[0];
    
    if (!prop) throw new Error("Proprietário não encontrado.");

    const valid = await bcrypt.compare(password, prop.password_hash);
    
    if (!valid) throw new Error("Senha incorreta.");

    return { token: "FAKE-JWT-TOKEN-ADMIN", user: prop };
}