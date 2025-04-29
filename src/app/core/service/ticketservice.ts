import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TicketService {
    ticketInformation = {
        personalInformation: {
            firstname: '',
            lastname: '',
            age: null as number | null // `age` için tür belirtildi
        },
        seatInformation: {
          class: null as string | null,
          wagon: null as string | null,
          seat: null as string | null
        },
        paymentInformation: {
            cardholderName: '',
            cardholderNumber: '',
            date: '',
            cvv: '',
            remember: false
        }
    };

    private paymentComplete = new Subject<any>();

    paymentComplete$ = this.paymentComplete.asObservable();

    getTicketInformation() {
        return this.ticketInformation;
    }

    setTicketInformation(ticketInformation:any) {
        this.ticketInformation = ticketInformation;
    }

    complete() {
        this.paymentComplete.next(this.ticketInformation.personalInformation);
    }
}
