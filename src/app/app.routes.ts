import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page/home-page').then((m) => m.HomePage),
    title: 'Topman Realstyle | Modern Menswear',
  },
  {
    path: 'collections/:slug',
    loadComponent: () =>
      import('./features/catalog/category-page/category-page').then((m) => m.CategoryPage),
  },
  { path: '**', redirectTo: '' },
];
