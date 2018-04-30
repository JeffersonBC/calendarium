import { Component, OnInit } from '@angular/core';

import { ConviteService } from '../../services/convite.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-eventos-convites',
  templateUrl: './eventos-convites.component.html',
  styleUrls: ['./eventos-convites.component.scss']
})
export class EventosConvitesComponent implements OnInit {

  public listaConvites$;
  public mensagem = '';
  public cache_convites: any[] = [];


  constructor(
    private conviteService: ConviteService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.map(dados => dados['convites']).subscribe(
      dados => this.cache_convites = dados
    );
  }

  onMensagem(mensagem: string) {
    this.mensagem = mensagem;
  }

}
