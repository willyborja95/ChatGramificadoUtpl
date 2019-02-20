import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DocenteService } from '../servicios/docente/docente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private docenteService: DocenteService, 
    private router: Router
    ) { }



  canActivate(): boolean {
    if (!this.docenteService.haIniciadoSesion()) {
      this.router.navigate(['/login'])
      this.docenteService.cerrarSesionDocente();
      return false;
    } else {
      return true;
    }
  }
}
