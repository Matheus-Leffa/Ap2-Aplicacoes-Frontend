export interface Filme {
  id?: number | string;
  titulo: string;
  diretor: string;
  categoria: string;
  anoPublicacao: number;
  disponivel: boolean;
}