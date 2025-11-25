import { getConnection } from './config/db';
import bcrypt from 'bcrypt';

async function garantirAdmin() {
    try {
        console.log("🔌 Conectando...");
        const pool = await getConnection();
        
        const user = 'admin';
        const pass = 'admin'; // A senha que você quer
        const hash = await bcrypt.hash(pass, 10);

        console.log("👤 Verificando usuário admin...");
        
        const check = await pool.request()
            .input('username', user)
            .query("SELECT * FROM Proprietarios WHERE username = @username");

        if (check.recordset.length > 0) {
            // SE JÁ EXISTE, ATUALIZA A SENHA
            await pool.request()
                .input('user', user)
                .input('pass', hash)
                .query("UPDATE Proprietarios SET password_hash = @pass WHERE username = @user");
            console.log(`✅ SENHA RESETADA! Usuário '${user}' agora tem a senha '${pass}'.`);
        } else {
            // SE NÃO EXISTE, CRIA
            await pool.request()
                .input('user', user)
                .input('pass', hash)
                .query(`
                    INSERT INTO Proprietarios (username, password_hash, nome, email)
                    VALUES (@user, @pass, 'Big Boss', 'admin@pizzaria.com')
                `);
            console.log(`✅ CRIADO! Usuário '${user}' com senha '${pass}'.`);
        }

        process.exit(0);
    } catch (e) {
        console.error("❌ Erro:", e);
        process.exit(1);
    }
}

garantirAdmin();