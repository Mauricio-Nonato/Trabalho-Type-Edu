import { Router } from "express";
import { cadastrarCliente, loginCliente } from "../service/clientesServices"; // Sem .js

const router = Router();

router.post("/", async (req, res) => {
    try {
        if (req.body.password.length < 4)
            return res.status(400).json({ error: "Senha deve ter pelo menos 4 caracteres." });
        const cliente = await cadastrarCliente(req.body);
        res.status(201).json(cliente);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await loginCliente(username, password);
        res.json(result);
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
});

export default router;