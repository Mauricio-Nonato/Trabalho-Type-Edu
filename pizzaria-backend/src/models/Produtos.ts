export interface Produto {
  cod_produto?: number;
  tipo_produto: 'Pizza Salgada' | 'Pizza Doce' | 'Suco' | 'Refrigerante' | 'Sobremesas';
  nome: string;
  descricao?: string | null;
  preco: number;
}
