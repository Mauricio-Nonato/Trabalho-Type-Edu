import { Router } from "express";
import { 
    listarPedidos, 
    cadastrarPedidoCompleto, 
    getRelatorioFinanceiro, 
    getDashboardResumo, 
    atualizarStatusPedido, 
    buscarUltimoPedidoCliente 
} from "../service/pedidosService";

const router = Router();

// 1. Listar todos os pedidos (Para o Admin)
router.get("/", async(req, res) => {
    try {
        const pedidos = await listarPedidos();
        res.json(pedidos);
    } catch(err:any) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Resumo Financeiro (Para os Cards do Admin)
router.get("/resumo", async(req, res) => {
    try {
        const resumo = await getDashboardResumo();
        res.json(resumo);
    } catch(err:any) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Rastreio (Para o Cliente ver o último pedido dele)
router.get("/ultimo/:username", async(req, res) => {
    try {
        const pedido = await buscarUltimoPedidoCliente(req.params.username);
        res.json(pedido);
    } catch(err:any) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Criar Pedido (Finalizar carrinho)
router.post("/", async(req, res) => {
    try {
        const pedido = await cadastrarPedidoCompleto(req.body);
        res.status(201).json(pedido);
    } catch(err:any) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Atualizar Status (Para o Admin mudar o andamento)
router.put("/:cod_pedido/status", async(req, res) => {
    try {
        const cod = parseInt(req.params.cod_pedido);
        const { status } = req.body;
        await atualizarStatusPedido(cod, status);
        res.json({ success: true });
    } catch(err:any) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Relatório (Opcional)
router.get("/relatorio", async(req, res) => {
    try {
        const relatorio = await getRelatorioFinanceiro();
        res.json(relatorio);
    } catch(err:any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;