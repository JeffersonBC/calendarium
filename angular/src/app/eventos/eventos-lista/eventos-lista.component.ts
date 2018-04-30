import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EventosService } from '../../services/eventos.service';
import { ConviteService } from '../../services/convite.service';
import { CacheEventosService } from '../../services/cache-eventos.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-eventos-lista',
  templateUrl: './eventos-lista.component.html',
  styleUrls: ['./eventos-lista.component.scss']
})
export class EventosListaComponent {

  @Input() public objetos: any[];
  @Input() public mensagemArrayVazio: string;

  @Output() public emitirMensagem = new EventEmitter<string>();


  constructor(
    private conviteService: ConviteService,
    private cacheEventosService: CacheEventosService,
    public formService: FormService,
  ) { }

  public cancelar(array_id: number, object_id: number) {
    if (confirm(
      `Tem certeza que deseja cancelar sua inscrição no evento \'${this.objetos[array_id]['event']['name']}\'?`
    )) {
      const responder$ = this.conviteService.postConviteCancelar(object_id).subscribe(
        dados => {
          if (dados['success']) {
            this.objetos.splice(array_id, 1);

          } else {
            this.emitirMensagem.emit(dados['msg']);
          }
        }
      );
    }
  }

  public responderConvite(aceitar: boolean, array_id: number, object_id: number) {
    if (aceitar) {
      const responder$ = this.conviteService.postConviteAceitar(object_id).subscribe(
        dados => {
          if (dados['success']) {
            this.cacheEventosService.setMesDirtyIsoDate(this.objetos[array_id]['event']['start_datetime']);

            this.objetos.splice(array_id, 1);
            this.conviteService.emitirMudancaQtd(-1);

          } else {
            this.emitirMensagem.emit(dados['msg']);
          }
        }
      );

    } else {
      if (confirm(
        `Tem certeza que deseja rejeitar o convite para o evento \'${this.objetos[array_id]['event']['name']}\'?`
      )) {
        const responder$ = this.conviteService.postConviteRejeitar(object_id).subscribe(
          dados => {
            if (dados['success']) {
              this.objetos.splice(array_id, 1);
              this.conviteService.emitirMudancaQtd(-1);
            } else {
              this.emitirMensagem.emit(dados['msg']);
            }
          }
        );
      }
    }
  }
}
