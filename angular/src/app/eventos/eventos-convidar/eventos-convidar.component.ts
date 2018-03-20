import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Select2OptionData } from 'ng2-select2';

import { EventosService } from '../../services/eventos.service';


@Component({
  selector: 'app-eventos-convidar',
  templateUrl: './eventos-convidar.component.html',
  styleUrls: ['./eventos-convidar.component.css']
})
export class EventosConvidarComponent implements OnInit {

  public evento_detalhes$;
  public options;

  public ids_usuarios = '';

  constructor(
    private eventosService: EventosService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.evento_detalhes$ = this.eventosService.getDetalhesEventoConvite(this.route.snapshot.params['id']);
    this.options = {
      multiple: true,
    };
  }

  onSubmit() {
    this.eventosService.postAdicionarConvite(
      this.ids_usuarios,
      this.route.snapshot.params['id']
    ).subscribe(
      dados => console.log(dados)
    );

    this.router.navigate(['/eventos']);
  }

  changed(data: {value: string[]}) {
    if (!data.value) {
      this.ids_usuarios = '';

    } else {
      this.ids_usuarios = data.value.join('|');
    }
  }

}
