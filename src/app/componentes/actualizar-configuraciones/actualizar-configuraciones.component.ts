import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/dominio/configuracion';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { Notification } from 'src/app/shared/notifications/notification';

@Component({
  selector: 'actualizar-configuraciones',
  templateUrl: './actualizar-configuraciones.component.html',
  styleUrls: ['./actualizar-configuraciones.component.css']
})
export class ActualizarConfiguracionesComponent implements OnInit {

  configuraciones: Array<Configuracion>
  notification: Notification = new Notification()
  cargando: boolean


  constructor(private router: Router, private configuracionService: ConfiguracionService) {
    this.cargando = false
  }

  async ngOnInit() {
    this.traerConfiguraciones()
  }

  async traerConfiguraciones() {
    try {
      this.configuraciones = await this.configuracionService.configuraciones()
      this.cargando = false
    } catch (error) {
      this.notification.showError(error)
    }
  }


  async actualizarConfiguracion(configuracion: Configuracion) {
    try {
      await this.configuracionService.actualizarConfiguraciones(configuracion)
      this.traerConfiguraciones()
    } catch (error) {
      this.notification.showError(error)
    }
  }
/*
  irAEvolucionDePrecios(tasacion: Tasacion) {
    if (tasacion.id) {
      this.router.navigate(['/evolucion-precios', tasacion.id])
    }
    if (tasacion.id_anterior) {
      this.router.navigate(['/evolucion-precios', tasacion.id_anterior])

    }
  }

  irATasarPropiedad() {
    this.router.navigate(['/tasar-propiedad'])
  }
*/
}
