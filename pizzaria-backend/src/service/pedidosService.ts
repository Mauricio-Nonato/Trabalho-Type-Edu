import { getConnection } from "../config/db";
import { Pedido } from "../models/Pedido";
import { ItemPedido } from "../models/ItemPedido";

// ... mantenha a função listarPedidos como estava ...
export async function listarPedidos(): Promise<Pedido[]> {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM Pedidos ORDER BY cod_pedido DESC`);
    return result.recordset;
}

// --- ATUALIZE ESTA FUNÇÃO ---
export async function cadastrarPedidoCompleto(data: { pedido: Pedido; itens: ItemPedido[] }) {
    const pool = await getConnection();
    const { pedido, itens } = data;

    // 1. Inserir pedido principal
    // ADICIONADO: data_pedido = GETDATE() e status = 'Aberto'
    const pedidoResult = await pool.request()
        .input('username_cliente', pedido.username_cliente)
        .input('tipo_entrega', pedido.tipo_entrega)
        .input('forma_pagamento', pedido.forma_pagamento)
        .input('preco_total', pedido.preco_total)
        .input('observacao', pedido.observacao)
        .input('endereco_entrega', pedido.endereco_entrega)
        .query(`
            INSERT INTO Pedidos 
                (username_cliente, tipo_entrega, forma_pagamento, preco_total, observacao, endereco_entrega, data_pedido, status)
            VALUES 
                (@username_cliente, @tipo_entrega, @forma_pagamento, @preco_total, @observacao, @endereco_entrega, GETDATE(), 'Aberto');
            
            SELECT SCOPE_IDENTITY() AS cod_pedido;
        `);

    const cod_pedido = pedidoResult.recordset[0].cod_pedido;

    // 2. Inserir itens do pedido
    for (const item of itens) {
        await pool.request()
            .input('cod_pedido', cod_pedido)
            .input('cod_produto', item.cod_produto)
            .input('nome_produto', item.nome_produto)
            .input('quantidade', item.quantidade)
            .input('preco_unitario', item.preco_unitario)
            .input('tamanho_selecionado', item.tamanho_selecionado)
            .input('observacao_item', item.observacao_item || '')
            .query(`
                INSERT INTO ItensPedidos
                    (cod_pedido, cod_produto, nome_produto, quantidade, preco_unitario, tamanho_selecionado, observacao_item)
                VALUES 
                    (@cod_pedido, @cod_produto, @nome_produto, @quantidade, @preco_unitario, @tamanho_selecionado, @observacao_item)
            `);
    }

    return { cod_pedido, ...pedido };
}

// ... mantenha a função getRelatorioFinanceiro e getDashboardResumo ...
export async function getRelatorioFinanceiro(): Promise<{ tipo_produto: string; total: number }[]> {
    const pool = await getConnection();
    const result = await pool.request().query(`
        SELECT PR.tipo_produto, SUM(I.preco_unitario * I.quantidade) AS total
        FROM Pedidos P
        INNER JOIN ItensPedidos I ON P.cod_pedido = I.cod_pedido
        INNER JOIN Produtos PR ON I.cod_produto = PR.cod_produto
        GROUP BY PR.tipo_produto
    `);
    return result.recordset;
}

export async function getDashboardResumo() {
    const pool = await getConnection();

    const queryDia = `
        SELECT SUM(preco_total) as total, COUNT(*) as qtd 
        FROM Pedidos 
        WHERE CAST(data_pedido AS DATE) = CAST(GETDATE() AS DATE)
        AND status <> 'Cancelado'
    `;

    const queryMes = `
        SELECT SUM(preco_total) as total, COUNT(*) as qtd 
        FROM Pedidos 
        WHERE MONTH(data_pedido) = MONTH(GETDATE()) 
        AND YEAR(data_pedido) = YEAR(GETDATE())
        AND status <> 'Cancelado'
    `;

    const resultDia = await pool.request().query(queryDia);
    const resultMes = await pool.request().query(queryMes);

    return {
        hoje: resultDia.recordset[0], 
        mes: resultMes.recordset[0]   
    };
}

// ... (mantenha o código anterior)

// Atualizar Status (Para o Admin usar)
export async function atualizarStatusPedido(cod_pedido: number, novoStatus: string) {
    const pool = await getConnection();
    await pool.request()
        .input('cod', cod_pedido)
        .input('status', novoStatus)
        .query("UPDATE Pedidos SET status = @status WHERE cod_pedido = @cod");
    return { message: "Status atualizado!" };
}

// Buscar último pedido do cliente (Para o Cliente ver o rastreio)
export async function buscarUltimoPedidoCliente(username: string) {
    const pool = await getConnection();
    const result = await pool.request()
        .input('user', username)
        .query(`
            SELECT TOP 1 * FROM Pedidos 
            WHERE username_cliente = @user 
            ORDER BY cod_pedido DESC
        `);
    return result.recordset[0]; // Retorna só o último
}