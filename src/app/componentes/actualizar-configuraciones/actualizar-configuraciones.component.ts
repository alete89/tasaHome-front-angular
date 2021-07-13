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
  cargando: boolean = false


  constructor(private router: Router, private configuracionService: ConfiguracionService) {
  }

  async ngOnInit() {
    this.traerConfiguraciones()
  }

  async traerConfiguraciones() {
    try {
      this.cargando = true
      this.configuraciones = await this.configuracionService.configuraciones()
    } catch (error) {
      this.notification.showError(error)
    } finally {
      this.cargando = false
    }
  }

  async actualizarConfiguracion(configuracion: Configuracion) {
    try {
      this.cargando = true
      await this.configuracionService.actualizarConfiguraciones(configuracion)
      this.notification.popUpMessage("¡Configuración actualizada!", "success", 2500)
      this.traerConfiguraciones()
    } catch (error) {
      console.dir(error)
      this.notification.showError(error)
    } finally {
      this.cargando = false
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
