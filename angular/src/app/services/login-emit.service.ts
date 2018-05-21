import { Injectable } from '@angular/core';

import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class LoginEmitService {
    // Observable string sources
    private emitChangeStatus = new Subject<any>();

    // Used when offline, to check the previous status
    public currentStatus: boolean;

    // Observable string streams
    changeEmitted$ = this.emitChangeStatus.asObservable();

    // Service message commands
    emitChange(change: boolean) {
        this.emitChangeStatus.next(change);
        this.currentStatus = change;
    }
}
