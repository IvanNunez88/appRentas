import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { VehiculoService } from '../Services/Vehiculo.service';
import { Vehiculo } from './models/vehiculo.interface';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class VehiculoPage implements OnInit, ViewWillEnter {
  listaVehiculos: Vehiculo[] = [];

  constructor(
    private _vehiculoService: VehiculoService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.cargarVehiculos();
  }

  ionViewWillEnter() {
    this.cargarVehiculos();
  }

  private async cargarVehiculos() {
    this._vehiculoService.listaVehiculos().subscribe({
      next: async (data) => {
        if (data.status) {
          this.listaVehiculos = await data.values;
        }
      },
    });
  }

  editarVehiculo(vehiculo: Vehiculo) {
    this.blurActiveElement();
    this.router.navigate(['/detalle'], {
      state: {
        vehiculo: vehiculo,
      },
    });
  }

  crearVehiculo() {
    this.blurActiveElement();
    this.router.navigate(['/detalle'], {
      state: {
        vehiculo: null,
      },
    });
  }

  private blurActiveElement() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }
}
