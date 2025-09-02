import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CampaignComponent } from './pages/campaign/campaign.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'campaign', component: CampaignComponent },
  { path: '**', redirectTo: 'dashboard' }
];
