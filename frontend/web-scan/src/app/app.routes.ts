import { Routes } from '@angular/router';
import { GenerateComponent } from './generate/generate.component';
import { VerifyComponent } from './verify/verify.component';
import { ScanComponent } from './scan/scan.component';
import { ItemlistComponent } from './itemlist/itemlist.component';

export const routes: Routes = [
    { path: '', component: GenerateComponent },
    { path: 'verify/:token', component: VerifyComponent },
    { path: 'scan', component: ScanComponent },
    { path: 'list', component: ItemlistComponent },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
