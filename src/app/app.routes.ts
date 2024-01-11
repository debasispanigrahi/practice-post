import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContentComponent } from './pages/content/content.component';

export const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: ContentComponent,
    path: 'content',
  },
];
