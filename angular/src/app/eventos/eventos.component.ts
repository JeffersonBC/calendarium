import { Component, OnInit, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { MaterializeAction } from 'angular2-materialize';

import { EventosService } from '../services/eventos.service';
import { CacheEventosService } from '../services/cache-eventos.service';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  public meses: string[] = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  public anos: number[] = [2018, 2019, 2020, 2021, 2022, 2023];

  private hoje = new Date();
  public hoje_mes = this.hoje.getMonth() + 1;
  public hoje_ano = this.hoje.getFullYear();

  constructor(
    public cacheEventoService: CacheEventosService
  ) { }

  ngOnInit() {
    if (!this.cacheEventoService.cache[`${this.hoje_ano}`]['carregado']) {
      this.cacheEventoService.carregarAno(this.hoje_ano);

    } else {
      this.cacheEventoService.atualizarMes(this.hoje_ano, this.hoje_mes);
    }
  }

  public setMes(mes: number) {
    this.hoje_mes = mes;
    this.cacheEventoService.atualizarMes(this.hoje_ano, this.hoje_mes);
  }

  public setAno(ano: number) {
    this.hoje_ano = ano;

    if (!this.cacheEventoService.cache[`${ano}`]['carregado']) {
      this.cacheEventoService.carregarAno(ano);
    }
  }

}
