export interface Pedido {
  cod_pedido?: number;
  username_cliente?: string | null;
  data_pedido?: string;
  status?: 'Aberto' | 'Em Preparo' | 'Concluído' | 'Cancelado';
  forma_pagamento?: string | null;
  tipo_entrega?: 'Entrega' | 'Retirada';
  preco_total?: number;
  observacao?: string | null;
  endereco_entrega?: string | null;
}
