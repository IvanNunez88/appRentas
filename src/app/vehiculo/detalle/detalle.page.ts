import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, ViewWillLeave } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { TamanoService } from 'src/app/Services/Tamano.service';
import { Vehiculo } from '../models/vehiculo.interface';
import { VehiculoService } from 'src/app/Services/Vehiculo.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class DetallePage implements OnInit {
  titulo: string = 'Agregar Vehículo';
  boton: string = 'Guardar';
  mostrarCheck: boolean = false;
  mostrarLoading: boolean = false;
  vehiculo?: Vehiculo;
  listaCatTamano: iCatTamano[] = [];
  frmVehiculo: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private _tamanoService: TamanoService,
    private fb: FormBuilder,
    private _vehiculoService: VehiculoService,
    private toastCtrl: ToastController
  ) {
    this.frmVehiculo = this.fb.group({
      descrip: ['', Validators.required],
      idTamaño: [0, Validators.required],
      capacidad: [
        0,
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],
      pRenta: [0, [Validators.required, Validators.min(1)]],
      isEstado: [true],
    });
  }

  async ngOnInit() {
    const vehiculo = (
      this.router.currentNavigation()?.extras?.state ?? history.state
    )?.vehiculo as Vehiculo | null | undefined;

    if (vehiculo) {
      this.vehiculo = vehiculo;
      this.titulo = 'Editar Vehículo';
      this.boton = 'Actualizar';
      this.mostrarCheck = true;

      this.frmVehiculo.patchValue({
        descrip: vehiculo.vehiculo,
        idTamaño: vehiculo.idTamano,
        capacidad: vehiculo.capacidad,
        pRenta: vehiculo.pRenta,
        isEstado: vehiculo.isActivo,
      });
    } else {
      this.frmVehiculo.reset({
        descrip: '',
        idTamaño: '',
        capacidad: '',
        pRenta: '',
        isEstado: true,
      });
    }

    await this.cargaCatTamanos();
  }

  async cargaCatTamanos() {
    this._tamanoService.listaCatTamanos().subscribe({
      next: async (data) => {
        if (data.status) {
          this.listaCatTamano = await data.values;

          // PARA QUE ESTE SELEECCIONAD LA OPCIÓN O
          if (this.listaCatTamano.length > 0 && !this.vehiculo) {
            this.frmVehiculo.patchValue({
              idTamaño: this.listaCatTamano[0].idTamano,
            });
          }
        }
      },
    });
  }

  async guardar_editarVehiculo() {
    this.mostrarLoading = true;

    if (!this.vehiculo) {
      //GUARDAR INFORMACIÓN

      const dicDatos: Record<string, any> = {
        descrip: this.frmVehiculo.value.descrip,
        idTamaño: this.frmVehiculo.value.idTamaño,
        capacidad: this.frmVehiculo.value.capacidad,
        pRenta: this.frmVehiculo.value.pRenta,
      };

      //const sub =
      this._vehiculoService.agregarVehiculo(dicDatos).subscribe({
        next: async (data) => {
          if (data.status) {
            this.mostrarLoading = false;
            const toast = await this.toastCtrl.create({
              message: 'Vehículo guardado correctamente',
              duration: 2500,
              color: 'success',
              position: 'top',
              icon: 'checkmark-circle',
            });
            await toast.present();

            //NAVEGAR A LISTA DE VEHÍCULOS
            await this.router.navigateByUrl('/vehiculo');
          } else {
            const toast = await this.toastCtrl.create({
              message: data.msg,
              duration: 2500,
              color: 'warning',
              position: 'top',
              icon: 'alert-circle',
            });
            await toast.present();
          }
        },
        complete: () => {
          this.mostrarLoading = false;
        },
        error: async () => {
          const toast = await this.toastCtrl.create({
            message:
              'Hubo un error, favor de contactar al administrador de la aplicación.',
            duration: 2500,
            color: 'danger',
            position: 'top',
            icon: 'alert-circle',
          });
          await toast.present();
        },
      });
    } else {
      //EDITAR INFORMACIÓN
      const dicDatos: Record<string, any> = {
        idVehiculo: this.vehiculo.idVehiculo,
        descrip: this.frmVehiculo.value.descrip,
        idTamaño: this.frmVehiculo.value.idTamaño,
        capacidad: this.frmVehiculo.value.capacidad,
        pRenta: this.frmVehiculo.value.pRenta,
        isEstado: this.frmVehiculo.value.isEstado,
      };

      this._vehiculoService.actualizarVehiculo(dicDatos).subscribe({
        next: async (data) => {
          if (data.status) {
            this.mostrarLoading = false;
            const toast = await this.toastCtrl.create({
              message: 'Vehículo actualizado correctamente',
              duration: 2500,
              color: 'success',
              position: 'top',
              icon: 'checkmark-circle',
            });
            await toast.present();

            //NAVEGAR A LISTA DE VEHÍCULOS
            await this.router.navigateByUrl('/vehiculo');
          } else {
            const toast = await this.toastCtrl.create({
              message: data.msg,
              duration: 2500,
              color: 'warning',
              position: 'top',
              icon: 'alert-circle',
            });
            await toast.present();
          }
        },
        complete: () => {
          this.mostrarLoading = false;
        },
        error: async () => {
          const toast = await this.toastCtrl.create({
            message:
              'Hubo un error, favor de contactar al administrador de la aplicación.',
            duration: 2500,
            color: 'danger',
            position: 'top',
            icon: 'alert-circle',
          });
          await toast.present();
        },
      });
    }
  }
}

interface iCatTamano {
  idTamano: number;
  tamano: string;
}
