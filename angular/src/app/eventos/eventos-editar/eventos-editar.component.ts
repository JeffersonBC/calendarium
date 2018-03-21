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
  public editando: boolean;
  public formularioValidado = false;

  constructor(
    public formService: FormService,

    private router: Router,
    private eventoService: EventosService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

  materializeDateParams() {
    return this.formService.getDateParams();
  }

  materializeTimeParams() {
    return this.formService.getTimeParams();
  }

  ngOnInit() {
    this.editando = this.activatedRoute.snapshot.routeConfig.path === 'editar/:id';

    this.formulario = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null],
      start_date: [null, Validators.required],
      start_time: [null, Validators.required],
      end_date: [null, Validators.required],
      end_time: [null, Validators.required],
    });

    if (this.editando) {
      this.eventoService.getEvento(this.activatedRoute.snapshot.params['id'])
        .subscribe(dados => {
            const start = this.formService.isoDateToArray(dados['msg']['start_datetime']);
            const end = this.formService.isoDateToArray(dados['msg']['end_datetime']);

            this.formulario.patchValue({
              name: dados['msg']['name'],
              description: dados['msg']['description'],
              start_date: `${start[2]}/${start[1]}/${start[0]}`,
              start_time: `${start[3]}:${start[4]}`,
              end_date: `${end[2]}/${end[1]}/${end[0]}`,
              end_time: `${end[3]}:${end[4]}`,
            });
            Materialize.updateTextFields();
          }
        );

    } else {
      Materialize.updateTextFields();
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
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

      if (this.editando) {
        this.eventoService.postEventoAtualizar(evento, this.activatedRoute.snapshot.params['id']).subscribe(
          dados => {
            console.log(evento);
            console.log(dados);
            this.router.navigate(['/eventos']);
          }
        );

      } else {
        this.eventoService.postEventoAdicionar(evento).subscribe(
          dados => {
            console.log(dados);
            this.router.navigate(['/eventos']);
          }
        );
      }

    } else {
      this.formService.verificaValidacoesForm(this.formulario);
    }
  }

  delete() {
    if (confirm('Tem certeza que deseja DELETAR este evento?')) {
      this.eventoService.postEventoDeletar(this.activatedRoute.snapshot.params['id'])
      .subscribe(dados => {
          console.log(dados);
          this.router.navigate(['/eventos']);
        }
      );
    }
  }

}
