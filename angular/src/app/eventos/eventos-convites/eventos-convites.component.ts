import { Component, OnInit } from '@angular/core';

import { EventosService } from '../../services/eventos.service';


@Component({
  selector: 'app-eventos-convites',
  templateUrl: './eventos-convites.component.html',
  styleUrls: ['./eventos-convites.component.css']
})
export class EventosConvitesComponent implements OnInit {

  public listaConvites$;
  public mensagem = '';
  public temConvitesPendentes = false;

  constructor(
    private eventosService: EventosService,
  ) { }

  ngOnInit() {
    this.listaConvites$ = this.eventosService.getListarEventosConvidado();
  }

  onMensagem(mensagem: string) {
    console.log(mensagem);
    this.mensagem = mensagem;
  }

}
