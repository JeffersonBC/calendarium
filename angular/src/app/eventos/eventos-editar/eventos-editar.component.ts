import { Component, OnInit } from '@angular/core';


declare const Materialize;


@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.css']
})
export class EventosEditarComponent implements OnInit {

  private date_params = [{
    monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
    monthsFull: [ 'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro' , 'Dezembro' ],
    weekdaysFull: [ 'Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado' ],
    weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
    weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    format: 'dd/mm/yyyy',
    min: [2018, 0, 1],
    max: [2023, 11, 31],
    selectMonths: true,
    selectYears: 20,
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Ok',
    closeOnSelect: false
  }];

  private time_params = [{
    default: '12:00',
    twelvehour: false,
    donetext: 'OK',
    cleartext: 'Limpar',
    canceltext: 'Cancelar',
    autoclose: false
  }];

  constructor() { }

  materializeDateParams() {
    return this.date_params;
  }

  materializeTimeParams() {
    return this.time_params;
  }

  ngOnInit() {
    Materialize.updateTextFields();
  }

}
