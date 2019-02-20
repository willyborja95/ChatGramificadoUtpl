import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../../servicios/docente/docente.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  nombre: string;
  constructor(
    private docenteService: DocenteService,
  ) { }

  ngOnInit() {
    let nombre = this.docenteService.obtenerNombresDocente() ;
    let apellido = this.docenteService.ObtenerApellidosDocente();
    this.nombre = `${nombre} ${apellido}`;
  }
  cerrarSesion() {
    this.docenteService.cerrarSesionDocente();
  }
}
