import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'vehiculo',
    pathMatch: 'full',
  },
  // {
  //   path: 'home',
  //   loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  // },

  {
    path: 'vehiculo',
    loadComponent: () =>
      import('./vehiculo/vehiculo.page').then((m) => m.VehiculoPage),
  },
  {
    path: 'usuario',
    loadComponent: () =>
      import('./usuario/usuario.page').then((m) => m.UsuarioPage),
  },
  {
    path: 'detalle',
    loadComponent: () =>
      import('./vehiculo/detalle/detalle.page').then((m) => m.DetallePage),
  },
];
