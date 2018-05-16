import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Select2OptionData } from 'ng2-select2';

import { ConviteService } from '../../services/convite.service';
import { CacheEventosService } from '../../services/cache-eventos.service';


@Component({
  selector: 'app-eventos-convidar',
  templateUrl: './eventos-convidar.component.html',
  styleUrls: ['./eventos-convidar.component.scss']
})
export class EventosConvidarComponent implements OnInit {

  public evento_detalhes;
  public options;

  public ids_usuarios = '';

  public mensagemErro = '';

  constructor(
    private conviteService: ConviteService,
    private route: ActivatedRoute,
    private router: Router,
    public cacheEventosService: CacheEventosService,
  ) { }

  ngOnInit() {
    this.route.data.pipe(map(dados => dados['evento'])).subscribe(
      dados => {
        this.evento_detalhes = dados['msg'];
        if (!dados['success']) {
          this.mensagemErro = 'Não foi possível se conectar com o servidor, por favor tente novamente mais tarde.';
        }
      }
    );

    this.options = {
      multiple: true,
    };
  }

  onSubmit() {
    this.conviteService.postConviteAdicionar(
      this.ids_usuarios,
      this.route.snapshot.params['id']
    ).subscribe(
      dados => {
        this.cacheEventosService.setMesDirtyIsoDate(this.evento_detalhes['event']['start_datetime']);
        this.router.navigate(['/eventos']);
      },
      erro => {
        this.mensagemErro = 'Ocorreu um erro ao se comunicar com o servidor. Por favor, tente novamente mais tarde.';
      }
    );
  }

  changed(data: {value: string[]}) {
    if (!data.value) {
      this.ids_usuarios = '';

    } else {
      this.ids_usuarios = data.value.join('|');
    }
  }

}
