import { getConnection } from "../config/db";

export async function listarProdutos() {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM Produtos`);
    return result.recordset;
}

export async function cadastrarProduto(data: any) {
    const pool = await getConnection();
    const { tipo_produto, nome, descricao, preco, imagem, tem_grande, tem_broto, preco_broto } = data;

    await pool.request()
        .input('tipo_produto', tipo_produto)
        .input('nome', nome)
        .input('descricao', descricao)
        .input('preco', preco) // Preço da Grande (ou padrão)
        .input('imagem', imagem || null)
        .input('tem_grande', tem_grande ? 1 : 0)
        .input('tem_broto', tem_broto ? 1 : 0)
        .input('preco_broto', preco_broto || 0)
        .query(`
            INSERT INTO Produtos (tipo_produto, nome, descricao, preco, imagem, tem_grande, tem_broto, preco_broto)
            VALUES (@tipo_produto, @nome, @descricao, @preco, @imagem, @tem_grande, @tem_broto, @preco_broto)
        `);
    return data;
}

export async function editarProduto(cod_produto: number, data: any) {
    const pool = await getConnection();
    const { tipo_produto, nome, descricao, preco, imagem, tem_grande, tem_broto, preco_broto } = data;

    let query = `
        UPDATE Produtos 
        SET tipo_produto = @tipo_produto, nome = @nome, descricao = @descricao, 
            preco = @preco, tem_grande = @tem_grande, tem_broto = @tem_broto, preco_broto = @preco_broto
    `;
    
    if (imagem) query += `, imagem = @imagem `;
    
    query += ` WHERE cod_produto = @cod_produto`;

    const req = pool.request()
        .input('cod_produto', cod_produto)
        .input('tipo_produto', tipo_produto)
        .input('nome', nome)
        .input('descricao', descricao)
        .input('preco', preco)
        .input('tem_grande', tem_grande ? 1 : 0)
        .input('tem_broto', tem_broto ? 1 : 0)
        .input('preco_broto', preco_broto || 0);

    if (imagem) req.input('imagem', imagem);

    await req.query(query);
    return { cod_produto, ...data };
}

export async function excluirProduto(cod_produto: number) {
    const pool = await getConnection();
    // Primeiro apaga itens de pedidos vinculados para não dar erro (opcional, mas seguro)
    await pool.request().input('cod', cod_produto).query("DELETE FROM ItensPedidos WHERE cod_produto = @cod");
    await pool.request().input('cod', cod_produto).query("DELETE FROM Produtos WHERE cod_produto = @cod");
}