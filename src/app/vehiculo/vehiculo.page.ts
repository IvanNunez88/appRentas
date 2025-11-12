import { Component, OnInit } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VehiculoService } from '../Services/Vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class VehiculoPage implements OnInit {
  listaVehiculos: iRepVehiculo[] = [];

  constructor(private _vehiculoService: VehiculoService) {}

  async ngOnInit() {
    await this.cargarVehiculos();
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

  editarVehiculo(vehiculo: iRepVehiculo) {
    // Aquí puedes abrir un modal, navegar a otra página o setear un formulario con los datos
    console.log('Editar vehículo', vehiculo);
  }

  crearVehiculo() {
    // Acción para agregar un nuevo vehículo (abrir modal/formulario)
    console.log('Crear vehículo');
  }
}

interface iRepVehiculo {
  idVehiculo: number;
  vehiculo: string;
  idTamano: number;
  tamano: string;
  capacidad: number;
  pRenta: number;
  isActivo: boolean;
  estatus: string;
}
