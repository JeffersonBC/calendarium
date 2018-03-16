import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventosService } from '../../services/eventos.service';
import { FormService } from '../../services/form.service';

import { Evento } from '../models/evento.model';


declare const Materialize;


@Component({
  selector: 'app-eventos-editar',
  templateUrl: './eventos-editar.component.html',
  styleUrls: ['./eventos-editar.component.css']
})
export class EventosEditarComponent implements OnInit {

  public formulario: FormGroup;
  public editing: boolean;

  private date_params = [{
    monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
    monthsFull: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro' , 'Dezembro' ],
    weekdaysFull: [ 'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado' ],
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

  constructor(
    private router: Router,
    private eventoService: EventosService,
    private formBuilder: FormBuilder,
    public formService: FormService,
    public activatedRoute: ActivatedRoute
  ) { }

  materializeDateParams() {
    return this.date_params;
  }

  materializeTimeParams() {
    return this.time_params;
  }

  ngOnInit() {
    this.editing = this.activatedRoute.snapshot.routeConfig.path === 'editar/:id';

    Materialize.updateTextFields();

    this.formulario = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null],
      start_date: [null, Validators.required],
      start_time: [null, Validators.required],
      end_date: [null, Validators.required],
      end_time: [null, Validators.required],
    });
  }

  onSubmit() {
    const s_date: string[] = this.formulario.value['start_date'].split('/');
    const s_time: string[] = this.formulario.value['start_time'].split(':');

    const e_date: string[] = this.formulario.value['end_date'].split('/');
    const e_time: string[] = this.formulario.value['end_time'].split(':');

    const start_datetime = `${s_date[2]}-${s_date[1]}-${s_date[0]}T${s_time[0]}:${s_time[1]}:00`;
    const end_datetime   = `${e_date[2]}-${e_date[1]}-${e_date[0]}T${e_time[0]}:${e_time[1]}:00`;

    const evento: Evento = {
      name: this.formulario.value['name'],
      description: this.formulario.value['description'] == null ? '' : this.formulario.value['description'],
      start_datetime: start_datetime,
      end_datetime: end_datetime
    };

    this.eventoService.postAdicionarEvento(evento).subscribe(
      dados => console.log(dados)
    );

    this.router.navigate(['/eventos']);
  }

}
