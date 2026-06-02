import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Filme } from '../../models/filme';
import { FilmeService } from '../../services/filme.service';

@Component({
  selector: 'app-filme-form',
  imports: [FormsModule],
  templateUrl: './filme-form.html',
  styleUrl: './filme-form.css'
})
export class FilmeForm {
  titulo = "Novo filme";
  @Output() salvo = new EventEmitter<void>();

  private readonly filmeService = inject(FilmeService);

  filme: Filme = {
    titulo: '',
    diretor: '',
    categoria: '',
    anoPublicacao: new Date().getFullYear(),
    disponivel: true
  };

  salvar(): void {
    this.filmeService.criar(this.filme).subscribe({
      next: () => {
        this.filme = {
          titulo: '',
          diretor: '',
          categoria: '',
          anoPublicacao: new Date().getFullYear(),
          disponivel: true
        };

        this.salvo.emit();
      },
      error: (erro) => {
        console.error('Erro ao salvar filme:', erro);
      }
    });
  }
}