import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { FilmeForm } from './components/filme-form/filme-form';
import { FilmeList } from './components/filme-list/filme-list';

@Component({
  selector: 'app-root',
  imports: [Navbar, FilmeForm, FilmeList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
