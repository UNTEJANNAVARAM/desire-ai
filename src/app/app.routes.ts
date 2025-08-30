import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { SelectThemeComponent } from './pages/campaign/select-theme/select-theme.component';
import { SelectAssetsComponent } from './pages/campaign/select-assets/select-assets.component';
import { AutomationComponent } from './pages/campaign/automation/automation.component';
import { AssetDetailsComponent } from './pages/campaign/asset-details/asset-details.component';
import { DataSourceComponent } from './pages/campaign/data-source/data-source.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'campaign', component: CampaignComponent },
  { path: 'select-theme', component: SelectThemeComponent },
  { path: 'select-assets', component: SelectAssetsComponent },
  { path: 'automation', component: AutomationComponent },
  { path: 'asset-details', component: AssetDetailsComponent },
  { path: 'data-source', component: DataSourceComponent },
];
