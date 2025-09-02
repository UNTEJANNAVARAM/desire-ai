import { Component } from '@angular/core';

// Import your shell/layout components and RouterOutlet if you use Angular routing:
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';

import { RouterOutlet } from '@angular/router';

// Import global styles if you have an app.css file
import './app.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    LeftNavComponent,
  
    RouterOutlet,
  ],
})
export class AppComponent {}
