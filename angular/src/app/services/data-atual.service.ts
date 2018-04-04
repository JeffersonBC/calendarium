import { Injectable } from '@angular/core';

@Injectable()
export class DataAtualService {
  private dataHoje = new Date();

  public mes = this.dataHoje.getMonth() + 1;
  public ano = this.dataHoje.getFullYear();
}
