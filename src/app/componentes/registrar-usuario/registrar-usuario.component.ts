import { Component, OnInit } from '@angular/core';
import { Zona } from 'src/app/dominio/zona';
import { ZonaService } from 'src/app/servicios/zona.service';
import { Tasacion } from 'src/app/dominio/tasacion';
import { Usuario } from 'src/app/dominio/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  partidos: Array<Zona>
  provincias: Array<Zona>
  localidades: Array<Zona>
  usuario: Usuario
  confirmacion_contrasenia: String
  camposValidatingForm: FormGroup

  constructor(private zonaService: ZonaService) {
    this.usuario = new Usuario()
    this.camposValidatingForm = new FormGroup({
      nombreForm: new FormControl(null, [Validators.required]),
      apellidoForm: new FormControl(null, [Validators.required]),
    })

  }

  async ngOnInit() {
    // this.partidos = await this.zonaService.partidos()
    this.provincias = await this.zonaService.provincias()
    // this.localidades = await this.zonaService.localidades()
  }

  get inputNombre() { return this.camposValidatingForm.get('nombreForm') }
  get inputApellido() { return this.camposValidatingForm.get('apellidoForm') }


  nombreTieneErrores() {
    return this.inputNombre.invalid && (this.inputNombre.dirty || this.inputNombre.touched)
  }

  apellidoTieneErrores() {
    return this.inputApellido.invalid && (this.inputApellido.dirty || this.inputApellido.touched)
  }

  hayErrores() {
    return this.inputNombre.invalid || this.inputApellido.invalid
  }

  aceptar() {
    console.log(this.usuario)
  }

  async getPartidos() {
    this.partidos = await this.zonaService.partidos(this.usuario.provincia)
  }

  async getLocalidades() {
    this.localidades = await this.zonaService.localidades(this.usuario.partido)
  }

}
