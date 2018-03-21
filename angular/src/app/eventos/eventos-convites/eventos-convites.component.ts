import { Component, OnInit } from '@angular/core';

import { ConviteService } from '../../services/convite.service';


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
    private conviteService: ConviteService,
  ) { }

  ngOnInit() {
    this.listaConvites$ = this.conviteService.getConviteListar();
  }

  onMensagem(mensagem: string) {
    console.log(mensagem);
    this.mensagem = mensagem;
  }

}
