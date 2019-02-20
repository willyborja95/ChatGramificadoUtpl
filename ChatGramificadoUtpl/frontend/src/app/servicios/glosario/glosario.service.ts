import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { GlosarioTermino } from '../../models/glosarioTermino';
import { MatSnackBar } from '@angular/material';
@Injectable({
    providedIn: 'root'
})
export class GlosarioService {

    private url: string;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(
        private _http: HttpClient,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {
        this.url = environment.url
    }


    agregarTermino(glosarioTermino: GlosarioTermino) {
        this._http.post<GlosarioTermino>(this.url + '/api/glosario/agregarTerminoGlosario', glosarioTermino, this.httpOptions).subscribe(
            ref => {
                this.openSnackBar('Término agregado correctamente!', 'Exito!');
            });
    }

    listarTerminosGlosario(idChat): Observable<any> {
        return this._http.post(this.url + '/api/glosario/listarTerminosGlosario', idChat, this.httpOptions);
    }

    eliminarTerminoGlosario(idTermino) {
        let glosarioInfo = { '_id': idTermino };
        this._http.post(this.url + '/api/glosario/eliminarTerminoGlosario', glosarioInfo, this.httpOptions).subscribe(ref => {
            this.openSnackBar('Término eliminado correctamente!', 'Exito!');
        });
    }
    actualizarTermino(glosarioTermino: GlosarioTermino) {
        this._http.put(this.url + '/api/glosario/actualizarTermino', glosarioTermino, this.httpOptions).subscribe(res => {
            this.openSnackBar('Término actualizado correctamente!', 'Exito!');
        })
    }

    obtenerTermino(idTermino) {
        let params = { 'idTermino': idTermino };
        return this._http.post<GlosarioTermino>(this.url + '/api/glosario/obtenerTermino', params, this.httpOptions);
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            panelClass: ['green-snackbar'],
            duration: 2000,
        })
    }

}
