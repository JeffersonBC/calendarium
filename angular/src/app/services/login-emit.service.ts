import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginEmitService {
    // Observable string sources
    private emitChangeStatus = new Subject<any>();

    // Observable string streams
    changeEmitted$ = this.emitChangeStatus.asObservable();

    // Service message commands
    emitChange(change: any) {
        this.emitChangeStatus.next(change);
    }
}
