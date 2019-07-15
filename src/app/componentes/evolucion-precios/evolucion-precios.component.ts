import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasacionService } from 'src/app/servicios/tasacion.service';
import { Tasacion } from 'src/app/dominio/tasacion';
declare var require: any

@Component({
  selector: 'evolucion-precios',
  templateUrl: './evolucion-precios.component.html',
  styleUrls: ['./evolucion-precios.component.css']
})
export class EvolucionPreciosComponent implements OnInit {

  moment = require('moment');
  id_tasacion: string
  historialTasacion: Array<Tasacion>
  public chartType: string = 'line';
  public chartDatasets: Array<any>
  public chartLabels: Array<any>

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  constructor(private tasacionService: TasacionService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.id_tasacion = this.route.snapshot.paramMap.get("id")
    this.historialTasacion = await this.tasacionService.historialTasacion(this.id_tasacion)
    let historial_precios = this.historialTasacion.map(tasacion => tasacion.valor)
    let fechas = this.historialTasacion.map(tasacion => this.moment(tasacion.fecha).format('DD/MM/YYYY HH:MM'))
    this.chartDatasets = [
      { data: historial_precios, label: 'Precio' },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
    ];
    this.chartLabels = fechas
  }
  // this.formatear(tasacion.fecha)

}





