import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { ConviteService } from '../../services/convite.service';

@Component({
  selector: 'app-eventos-lista',
  templateUrl: './eventos-lista.component.html',
  styleUrls: ['./eventos-lista.component.css']
})
export class EventosListaComponent {

  @Input() public objetos: any[];
  @Input() public mensagemArrayVazio: string;

  @Output() public emitirMensagem = new EventEmitter<string>();


  constructor(
    private conviteService: ConviteService
  ) { }

  public comaparaDatas(inicio: string, fim: string): string {
    const d0 = new Date(inicio);
    const df = new Date(fim);

    if (d0.getFullYear() === df.getFullYear()) {
      if (d0.getMonth() === df.getMonth()) {
        if (d0.getDate() === df.getDate()) {
          return 'igual';
        } else {
          return 'dia_dif';
        }
      } else {
        return 'mes_dif';
      }
    } else {
      return 'ano_dif';
    }
  }

  public comparaHoras(inicio: string, fim: string): boolean {
    const d0 = new Date(inicio);
    const df = new Date(fim);

    const result = (
      d0.getHours() === df.getHours() &&
      d0.getMinutes() === df.getMinutes()
    );

    return result;
  }

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
            this.objetos.splice(array_id, 1);

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

            } else {
              this.emitirMensagem.emit(dados['msg']);
            }
          }
        );
      }
    }
  }
}
