import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormSharedService {
    verificaInvalidTouched(formulario: FormGroup, nomeCampo: string) {
        const campo = formulario.get(nomeCampo);

        return campo.invalid && (campo.touched || campo.dirty);
    }

    inputInvalidoCss(formulario: FormGroup, campo: string) {
        const invalid: boolean = this.verificaInvalidTouched(formulario, campo);

        return {
            'invalid': invalid,
        };
    }
}
