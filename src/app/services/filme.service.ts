import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../models/filme';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private readonly apiUrl = 'http://localhost:3000/filmes';
  private readonly http = inject(HttpClient);

  listar(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.apiUrl);
  }

  criar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(this.apiUrl, filme);
  }

  atualizar(id: number | string, filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(`${this.apiUrl}/${id}`, filme);
  }

  excluir(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}