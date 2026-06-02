import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Filme } from '../../models/filme';
import { FilmeService } from '../../services/filme.service';

@Component({
  selector: 'app-filme-list',
  templateUrl: './filme-list.html',
  styleUrl: './filme-list.css'
})
export class FilmeList {
  private readonly filmeService = inject(FilmeService);
  private readonly cdr = inject(ChangeDetectorRef);

  filmes: Filme[] = [];
  carregando = false;

  ngOnInit(): void {
    this.carregarFilmes();
  }

  carregarFilmes(): void {
    this.carregando = true;

    this.filmeService.listar().subscribe({
      next: (dados) => {
        this.filmes = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar filmes:', erro);
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

 editar(filme: Filme): void {
    if (!filme.id) {
      return;
    }

    const titulo = prompt('Título:', filme.titulo);
    if (titulo === null) return;

    const diretor = prompt('Diretor:', filme.diretor);
    if (diretor === null) return;

    const categoria = prompt('Categoria:', filme.categoria);
    if (categoria === null) return;

    const ano = prompt(
      'Ano de publicação:',
      filme.anoPublicacao.toString()
    );
    if (ano === null) return;

    const filmeAtualizado: Filme = {
      ...filme,
      titulo,
      diretor,
      categoria,
      anoPublicacao: Number(ano)
    };

    this.filmeService.atualizar(filme.id, filmeAtualizado).subscribe({
      next: () => this.carregarFilmes(),
      error: (erro) => console.error('Erro ao editar filme:', erro)
    });
  }

  excluir(filme: Filme): void {
    if (!filme.id) {
      return;
    }

    const confirmou = confirm(`Deseja excluir o filme "${filme.titulo}"?`);

    if (!confirmou) {
      return;
    }

    this.filmeService.excluir(filme.id).subscribe({
      next: () => this.carregarFilmes(),
      error: (erro) => console.error('Erro ao excluir f:', erro)
    });
  }
}