import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatToolbar, MatDivider],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
