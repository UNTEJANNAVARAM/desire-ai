import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { CampaignComponent } from './pages/campaign/campaign.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    LeftNavComponent,
    CampaignComponent,
  ],
})
export class AppComponent {
}