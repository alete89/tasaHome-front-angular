import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasacionService } from 'src/app/servicios/tasacion.service';
import { Tasacion } from 'src/app/dominio/tasacion';
import { Servicio } from 'src/app/dominio/servicio';

@Component({
  selector: 'actualizar-tasacion',
  templateUrl: './actualizar-tasacion.component.html',
  styleUrls: ['./actualizar-tasacion.component.css']
})
export class ActualizarTasacionComponent implements OnInit {

  id_tasacion: number
  tasacion: Tasacion

  constructor(private route: ActivatedRoute, private tasacionService: TasacionService) { }

  async ngOnInit() {
    this.id_tasacion = Number(this.route.snapshot.paramMap.get("id"))
    // this.route.queryParamMap.subscribe(queryParams => {
    //   this.id_tasacion = Number(queryParams.get("id"))
    // })
    this.tasacion = await this.tasacionService.searchTasacionById(this.id_tasacion)
    this.tasacion.servicios.forEach(servicio => servicio.chequear());
  }


}
