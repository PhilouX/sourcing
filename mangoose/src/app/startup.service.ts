import { Injectable } from '@angular/core';
import { Startup } from './startup';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//import { of } from 'rxjs/observable/of';
//import { MessageService } from './message.service';


@Injectable()
export class StartupService {
  startupsObservable: Observable<any[]>;

//private messageService: MessageService, dans le constructor

  constructor(private db: AngularFireDatabase) {
   }
  findAllStartups(): Observable<Startup[]> {

    return this.db.list('lessons')
      .map(Startup.fromJsonList);

  }
  /*
  getStartup(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }
  */

}
