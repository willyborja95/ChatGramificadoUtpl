import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { SalaChat } from 'src/app/models/salaChat';
import { DocenteService } from '../docente/docente.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class SalaChatService {

  private url: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private _http: HttpClient,
    private router: Router,
    private docenteService: DocenteService,
    private snackBar: MatSnackBar,
  ) {
    this.url = environment.url + '/api/salaChat'
  }

  guardar(idUsuario, idChat): Observable<any> {
    let infoSala = { 'idUsuario': idUsuario, 'idChat': idChat };
    let params = JSON.stringify(infoSala);
    return this._http.post(this.url + '/guardar', params, this.httpOptions);
  }

  guardarSala(sala: SalaChat) {
    let salaChat = {
      'docente': this.docenteService.obtenerIdDocente(),
      'nombreChat': sala.nombreChat
    }

    this._http.post<SalaChat>(this.url + '/guardarSalaChat', salaChat, this.httpOptions).subscribe(ref => {
      console.log(ref)
    })
  }
  guardarSalaGrupal(sala: SalaChat) {
    this._http.post<SalaChat>(this.url + '/guardarSalaGrupal', sala, this.httpOptions).subscribe(ref => {
      this.openSnackBar('Sala grupal agregada correctamente!', 'Exito!');
    })
  }
  listarSalasChat(idDocente): Observable<any> {
    const infoDocente = { 'docente': idDocente };
    return this._http.post(this.url + '/listarSalasChat', infoDocente, this.httpOptions);
  }
  listarSalasGrupal(idChat): Observable<any> {
    const sala = { 'chat': idChat };
    return this._http.post(this.url + '/obtenerSalasGrupal', sala, this.httpOptions);
  }

  obtenerNombreSalaChat(idChat): Observable<any> {
    let infoChat = { 'idChat': idChat };
    let params = JSON.stringify(infoChat);
    return this._http.post(this.url + '/obtenerNombreSalaChat', params, this.httpOptions);
  }
  obtenerSalaGrupal(idChat): Observable<any> {
    let infoChat = { 'idChat': idChat };
    return this._http.post(this.url + '/obtenerSalaGrupal', infoChat, this.httpOptions);
  }
  obtenerMensajes(id){
    const params = {
      chat: id,
    }
    return this._http.post(this.url + '/obtenerMensajes', params, this.httpOptions);
  }

  guardarSalaChat(chat) {
    let salaChat = {
      'docente': this.docenteService.obtenerIdDocente(),
      'nombreChat': chat
    }
    this._http.post<SalaChat>(this.url + '/guardarSalaChat', salaChat, this.httpOptions).subscribe(ref => {
      console.log(ref.chatAlmacenado._id);
      this.router.navigate(['/glosario/' + ref.chatAlmacenado._id])
    })
  }

  actualizarSalaChat(chat: SalaChat) {
    this._http.put(this.url + '/actualizarSalaChat', chat, this.httpOptions).subscribe(
      res => {
        this.openSnackBar('Nombre sala actualizado correctamente!', 'Exito!');
      }
    );
  } 

  actualizarChatGrupal(chat: SalaChat) {
    this._http.put(this.url + '/actualizarChatGrupal', chat, this.httpOptions).subscribe(
      res => {
        this.openSnackBar('Nombre sala actualizado correctamente!', 'Exito!');
      }
    );
  };

  eliminarChatGrupal(id) {
    let sala = { '_id': id };
    this._http.post(this.url + '/eliminarChatGrupal', sala, this.httpOptions).subscribe(ref => {
      this.openSnackBar('Sala grupal eliminada correctamente!', 'Exito!');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['green-snackbar'],
      duration: 2000,
    });
  }
}
