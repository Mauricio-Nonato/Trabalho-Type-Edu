import { Router } from "express";
import { listarProdutos, cadastrarProduto, editarProduto, excluirProduto } from "../service/produtosService"; // Sem .js

const router = Router();

router.get("/", async (req, res) => {
    try {
        const produtos = await listarProdutos();
        res.json(produtos);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const produto = await cadastrarProduto(req.body);
        res.status(201).json(produto);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:cod_produto", async (req, res) => {
    try {
        const cod = parseInt(req.params.cod_produto);
        const produto = await editarProduto(cod, req.body);
        res.json(produto);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:cod_produto", async (req, res) => {
    try {
        const cod = parseInt(req.params.cod_produto);
        await excluirProduto(cod);
        res.json({ message: "Produto excluído com sucesso." });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;