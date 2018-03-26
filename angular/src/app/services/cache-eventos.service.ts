import { Injectable } from '@angular/core';

import { EventosService } from './eventos.service';
import { FormService } from './form.service';


@Injectable()
export class CacheEventosService {
  public cache = {};

  private meses_dirty = {};

  constructor(
    private eventoService: EventosService,
    private formService: FormService,
  ) {

    this.inicializarCache();
  }

  private inicializarCache() {
    for (let ano = 2018; ano <= 2023; ano++) {
      this.cache[`${ano}`] = {};

      for (let mes = 1; mes <= 12; mes++) {
        this.cache[`${ano}`][`${mes}`] = [];
      }
    }
  }

  public carregarAno(ano: number) {
    this.eventoService.getEventosAno(ano).subscribe(
      dados => {
        if (dados['success']) {
          this.cache[`${ano}`]['carregado'] = true;

          for (const key of Object.keys(dados['msg'])) {
            for (const evento of Object.keys(dados['msg'][key])) {

              this.cache[`${ano}`][`${key}`].push(dados['msg'][key][evento]);
            }
          }

        }
      }
    );
  }

  public setMesDirty(ano: number, mes: number) {
    if (this.cache[`${ano}`]) {           // Se ano ainda não está no cache, não faz nada
      if (!this.meses_dirty[`${ano}`]) {  // Se ano no cache mas não em 'meses_dirty', inicializa ano
        this.meses_dirty[`${ano}`] = {};
      }

      this.meses_dirty[ano.toString()][mes.toString()] = true;
    }
    console.log(this.meses_dirty);
  }

  public setMesDirtyIsoDate(dateTime: string) {
    // ISO DATE = 'yyyy-MM-ddThh:mm:ss'
    console.log(dateTime);

    const start_date = this.formService.isoDateToArray(dateTime);
    this.setMesDirty(parseInt(start_date[0], 10), parseInt(start_date[1], 10));
  }

  public setMesClean(ano: number, mes: number) {
    if (this.meses_dirty[ano.toString()]) {
      this.meses_dirty[ano.toString()][mes.toString()] = false;
    }
  }

  // Caso ano esteja em cache e mes esteja marcado como 'dirty', atualiza mês
  public atualizarMes(ano: number, mes: number) {
    if (this.cache[`${ano}`]['carregado']) {
      if (this.meses_dirty[`${ano}`] && this.meses_dirty[`${ano}`][`${mes}`]) {

        this.eventoService.getEventosMes(ano, mes).subscribe(
          dados => {
            if (dados['success']) {
              this.cache[`${ano}`][`${mes}`] = dados['msg'];
              this.setMesClean(ano, mes);
            }
          }
        );

      }
    }
  }

  public limparCache() {
    this.inicializarCache();
    this.meses_dirty = {};
  }

}
