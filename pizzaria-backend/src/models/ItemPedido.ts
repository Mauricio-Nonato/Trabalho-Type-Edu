export interface ItemPedido {
  cod_item?: number;
  cod_pedido: number;
  cod_produto: number;
  nome_produto: string;
  quantidade: number;
  preco_unitario: number;
  tamanho_selecionado?: string;
  observacao_item?: string | null;
}
  