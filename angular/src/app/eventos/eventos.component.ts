import { Component, OnInit, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { MaterializeAction } from 'angular2-materialize';

import { EventosService } from '../services/eventos.service';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  public meses: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public anos: number[] = [2018, 2019, 2020, 2021, 2022, 2023];

  private hoje = new Date();
  private hoje_mes = this.hoje.getMonth() + 1;
  private hoje_ano = this.hoje.getFullYear();

  public observables_eventos = new Map();


  constructor(
    private eventoService: EventosService
  ) { }

  ngOnInit() {
    for (let ano = 2018; ano <= 2023; ano++) {
      for (let mes = 1; mes <= 12; mes++) {
        this.observables_eventos.set(`${ano}-${mes}`, this.eventoService.postListarEventosInscrito(mes, ano));
      }
    }
  }

  public setMes(mes: number) {
    this.hoje_mes = mes;
  }

  public setAno(ano: number) {
    this.hoje_ano = ano;
  }

  public getMes(): number {
    return this.hoje_mes;
  }

  public getAno(): number {
    return this.hoje_ano;
  }

  public dataAtualVazia(): boolean {
  /*
    if (!(this.hoje_ano.toString() in this.dados_eventos)) {
      return true;

    } else if (!(this.hoje_mes.toString() in this.dados_eventos[this.hoje_ano.toString()])) {
      return true;

    } else if (this.dados_eventos[this.hoje_ano.toString()][this.hoje_mes.toString()] === {}) {
      return true;
    }
  */
    return false;
  }

}
