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
  public hoje_mes = this.hoje.getMonth() + 1;
  public hoje_ano = this.hoje.getFullYear();

  public cache_eventos = {};



  constructor(
    private eventoService: EventosService
  ) { }

  ngOnInit() {
    for (let ano = 2018; ano <= 2023; ano++) {
      this.cache_eventos[`${ano}`] = {};

      for (let mes = 1; mes <= 12; mes++) {
        this.cache_eventos[`${ano}`][`${mes}`] = [];
      }
    }

    this.carregarEventosAno(this.hoje_ano);
  }

  public carregarEventosAno(ano: number) {
    this.eventoService.getEventoPorData(ano).subscribe(
      dados => {
        if (dados['success']) {
          this.cache_eventos[`${ano}`]['carregado'] = true;

          for (const key in dados['msg']) {
            if (dados['msg'].hasOwnProperty(key)) {

              for (const evento in dados['msg'][key]) {
                if (dados['msg'][key].hasOwnProperty(evento)) {

                  this.cache_eventos[`${ano}`][`${key}`]
                    .push(dados['msg'][key][evento]);
                }
              }
            }
          }
        }
      }
    );
  }

  public setMes(mes: number) {
    this.hoje_mes = mes;
  }

  public setAno(ano: number) {
    this.hoje_ano = ano;

    if (!this.cache_eventos[`${ano}`]['carregado']) {
      this.carregarEventosAno(ano);
    }
  }

}
