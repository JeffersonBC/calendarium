import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-eventos-lista',
  templateUrl: './eventos-lista.component.html',
  styleUrls: ['./eventos-lista.component.css']
})
export class EventosListaComponent implements OnInit {

  @Input() public objetos$;
  @Input() public mensagemArrayVazio: string;

  @Output() public onMensagem = new EventEmitter<string>();

  public objetos: any[];
  public arrayVazio = false;


  constructor(
    private eventosService: EventosService
  ) { }

  ngOnInit() {
    this.objetos$.subscribe(dados => {
        this.objetos = dados;

        if (this.objetos.length === 0) {
          this.arrayVazio = true;
        }
      }
    );
  }

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
      const responder$ = this.eventosService.postCancelarConvite(object_id).subscribe(
        dados => {
          if (dados['success']) {
            this.objetos.splice(array_id, 1);

            if (this.objetos.length === 0) {
              this.arrayVazio = true;
            }
          } else {
            this.onMensagem.emit(dados['msg']);
          }
        }
      );
    }
  }

  public responderConvite(aceitar: boolean, array_id: number, object_id: number) {
    if (aceitar) {
      const responder$ = this.eventosService.postAceitarConvite(object_id).subscribe(
        dados => {
          if (dados['success']) {
            this.objetos.splice(array_id, 1);

            if (this.objetos.length === 0) {
              this.arrayVazio = true;
            }
          } else {
            this.onMensagem.emit(dados['msg']);
          }
        }
      );

    } else {
      if (confirm(
        `Tem certeza que deseja rejeitar o convite para o evento \'${this.objetos[array_id]['event']['name']}\'?`
      )) {
        const responder$ = this.eventosService.postRejeitarConvite(object_id).subscribe(
          dados => {
            if (dados['success']) {
              this.objetos.splice(array_id, 1);

              if (this.objetos.length === 0) {
                this.arrayVazio = true;
              }
            } else {
              this.onMensagem.emit(dados['msg']);
            }
          }
        );
      }
    }
  }
}
