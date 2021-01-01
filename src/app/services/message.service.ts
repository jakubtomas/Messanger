import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Message {
    message: string;
    danger: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    public message$ = new Subject<Message>();

    constructor() {}

    public sendMessage(message: string, danger: boolean = true): void {
        this.message$.next({message, danger});
    }
}
