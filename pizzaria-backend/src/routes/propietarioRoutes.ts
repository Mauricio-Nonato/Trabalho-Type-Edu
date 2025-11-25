import { Router } from "express";
import { loginProprietario } from "../service/propietarioService"; // Sem .js

const router = Router();

router.post("/proprietario", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
        }
        const resultado = await loginProprietario(username, password);
        res.json(resultado);
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
});

export default router;