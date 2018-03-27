import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {
    private date_params = [{
        monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
        monthsFull: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro' , 'Dezembro' ],
        weekdaysFull: [ 'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado' ],
        weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
        weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        format: 'dd/mm/yyyy',
        min: [2018, 0, 1],
        max: [2023, 11, 31],
        selectMonths: true,
        selectYears: 20,
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Ok',
        closeOnSelect: false
        }];

    private time_params = [{
        default: '12:00',
        twelvehour: false,
        donetext: 'OK',
        cleartext: 'Limpar',
        canceltext: 'Cancelar',
        autoclose: false
    }];

    public getDateParams() {
        return this.date_params;
    }

    public getTimeParams() {
        return this.time_params;
    }

    public isoDateToArray(isoDate: string) {
        return isoDate
            .replace(/-/g, ' ')
            .replace(/T/g, ' ')
            .replace(/:/g, ' ')
            .replace(/Z/g, ' ')
            .replace(/\+/g, ' ')
            .split(' ');
    }

    verificaInvalidTouched(formulario: FormGroup, nomeCampo: string) {
        const campo = formulario.get(nomeCampo);

        return campo.invalid && campo.dirty;
    }

    inputInvalidoCss(formulario: FormGroup, campo: string) {
        const invalid: boolean = this.verificaInvalidTouched(formulario, campo);

        return {
            'invalid': invalid,
        };
    }

    verificaValidacoesForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(campo => {
            console.log(campo);
            const controle = formGroup.get(campo);
            controle.markAsDirty();

            if (controle instanceof FormGroup) {
                this.verificaValidacoesForm(controle);
            }
        });
    }

    comaparaDatas(inicio: string, fim: string): string {
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

    // Verdadeiro se horas iguais, falso se diferentes
    comparaHoras(inicio: string, fim: string): boolean {
        const d0 = new Date(inicio);
        const df = new Date(fim);

        const result = (
            d0.getHours() === df.getHours() &&
            d0.getMinutes() === df.getMinutes()
        );

        return result;
    }
}
