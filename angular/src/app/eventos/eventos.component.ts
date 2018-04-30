import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { MaterializeAction } from 'angular2-materialize';

import { EventosService } from '../services/eventos.service';
import { CacheEventosService } from '../services/cache-eventos.service';
import { DataAtualService } from '../services/data-atual.service';



@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public meses: string[] = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  public anos: number[] = [2018, 2019, 2020, 2021, 2022, 2023];

  constructor(
    private route: ActivatedRoute,

    public dataAtual: DataAtualService,
    public cacheEventoService: CacheEventosService,
  ) { }

  ngOnInit() {
    // Se ano não está em cache, carrega o cache
    if (!this.cacheEventoService.cache[`${this.dataAtual.ano}`]['carregado']) {
      this.route.data.map(dados => dados['listaEventos']).subscribe(
        (dados) => {
          this.cacheEventoService.popularCache(this.dataAtual.ano, dados);
        }
      );
    // Se não está em cache, checa se mês está 'dirty', e se estiver atualiza o mês
    } else {
      this.cacheEventoService.atualizarMes(this.dataAtual.ano, this.dataAtual.mes);
    }
  }

  public setMes(mes: number) {
    this.dataAtual.mes = mes;
    this.cacheEventoService.atualizarMes(this.dataAtual.ano, this.dataAtual.mes);
  }

  public setAno(ano: number) {
    this.dataAtual.ano = ano;

    if (!this.cacheEventoService.cache[`${ano}`]['carregado']) {
      this.cacheEventoService.carregarAno(ano);
    }
  }

}
