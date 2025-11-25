import { getConnection } from '../config/db';
import bcrypt from 'bcrypt';
import { Cliente } from "../models/Clientes";

// --- CADASTRO (Salva no Banco) ---
export async function cadastrarCliente(data: any): Promise<Cliente> {
    const pool = await getConnection();
    const { username, nome, email, celular, password, cep, rua, bairro, cidade, uf } = data;

    // Criptografa a senha antes de salvar (Segurança máxima)
    const password_hash = await bcrypt.hash(password, 10);

    await pool.request()
        .input('username', username)
        .input('nome', nome)
        .input('email', email)
        .input('celular', celular)
        .input('password_hash', password_hash)
        .input('cep', cep || null)
        .input('rua', rua || null)
        .input('bairro', bairro || null)
        .input('cidade', cidade || null)
        .input('uf', uf || null)
        .query(`
            INSERT INTO Clientes 
                (username, nome, email, celular, password_hash, cep, rua, bairro, cidade, uf)
            VALUES 
                (@username, @nome, @email, @celular, @password_hash, @cep, @rua, @bairro, @cidade, @uf)
        `);

    return { username, nome, email, celular, password_hash, cep, rua, bairro, cidade, uf };
}

// --- LOGIN (Verifica Usuário OU Email + Senha) ---
export async function loginCliente(loginInput: string, password: string): Promise<{ token: string; user: Cliente }> {
    const pool = await getConnection();
    
    // A MÁGICA ESTÁ AQUI: Procuramos pelo Username OU pelo Email
    const result = await pool.request()
        .input('loginInput', loginInput) 
        .query(`
            SELECT * FROM Clientes 
            WHERE username = @loginInput OR email = @loginInput
        `);

    const cliente = result.recordset[0];

    if (!cliente) {
        throw new Error("Usuário ou E-mail não encontrado.");
    }

    // Compara a senha digitada com a criptografia do banco
    const valid = await bcrypt.compare(password, cliente.password_hash);
    if (!valid) {
        throw new Error("Senha incorreta.");
    }

    // Retorna os dados do cliente (menos a senha)
    return { 
        token: "TOKEN-CLIENTE-123", 
        user: cliente 
    };
}