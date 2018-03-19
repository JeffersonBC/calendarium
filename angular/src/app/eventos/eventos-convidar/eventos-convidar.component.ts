import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Select2OptionData } from 'ng2-select2';

import { EventosService } from '../../services/eventos.service';
import { Convites } from '../models/evento.model';


@Component({
  selector: 'app-eventos-convidar',
  templateUrl: './eventos-convidar.component.html',
  styleUrls: ['./eventos-convidar.component.css']
})
export class EventosConvidarComponent implements OnInit {

  public evento_detalhes$;
  public options;

  constructor(
    private eventoService: EventosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.evento_detalhes$ = this.eventoService.getDetalhesEventoConvite(this.route.snapshot.params['id']);
    this.options = {
      multiple: true,
    };
  }

}
