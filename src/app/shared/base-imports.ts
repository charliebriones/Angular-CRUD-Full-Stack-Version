import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { materialModules } from './material-imports';

export const baseImports = [CommonModule, RouterLink, RouterOutlet, ...materialModules];
