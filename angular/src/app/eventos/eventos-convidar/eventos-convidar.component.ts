import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Select2OptionData } from 'ng2-select2';

import { ConviteService } from '../../services/convite.service';
import { CacheEventosService } from '../../services/cache-eventos.service';


@Component({
  selector: 'app-eventos-convidar',
  templateUrl: './eventos-convidar.component.html',
  styleUrls: ['./eventos-convidar.component.css']
})
export class EventosConvidarComponent implements OnInit {

  public evento_detalhes;
  public options;

  public ids_usuarios = '';

  constructor(
    private conviteService: ConviteService,
    private route: ActivatedRoute,
    private router: Router,
    private cacheEventosService: CacheEventosService,
  ) { }

  ngOnInit() {
    this.conviteService.getConviteDetalhesEvento(this.route.snapshot.params['id']).subscribe(
      dados => this.evento_detalhes = dados
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
