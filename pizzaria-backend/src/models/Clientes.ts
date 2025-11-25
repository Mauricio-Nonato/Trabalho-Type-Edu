export interface Cliente {
  username: string;
  nome: string;
  email: string;
  celular: string;
  password_hash: string;
  cep?: string | null;
  rua?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
}
