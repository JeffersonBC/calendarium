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
  public cache_convites: any[] = [];


  constructor(
    private conviteService: ConviteService,
  ) { }

  ngOnInit() {
    this.conviteService.getConviteListar().subscribe(
      dados => this.cache_convites = dados
    );
  }

  onMensagem(mensagem: string) {
    this.mensagem = mensagem;
  }

}
