import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { GlosarioService } from '../../../servicios/glosario/glosario.service';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss']
})
export class TerminosComponent implements OnInit {

  displayedColumns: string[] = ['termino', 'descripcion'];
  dataSource = new MatTableDataSource();
  constructor(
    private glosarioService: GlosarioService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    const sala = {
      chat: this.data.sala
    }
    this.glosarioService.listarTerminosGlosario(sala).subscribe(terminos => {
      this.dataSource.data = terminos.terminosGlosarioAlmacenados;
    });
  }

}
