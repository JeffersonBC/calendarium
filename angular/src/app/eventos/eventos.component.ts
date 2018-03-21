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
  public meses: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

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
        this.observables_eventos.set(`${ano}-${mes}`, this.eventoService.postEventoListar(mes, ano));
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

}
