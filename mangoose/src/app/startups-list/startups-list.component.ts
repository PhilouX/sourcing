import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-startups-list',
  templateUrl: './startups-list.component.html',
  styleUrls: ['./startups-list.component.css']
})
export class StartupsListComponent implements OnInit {
  startupsObservable: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { }
  
  ngOnInit() {
    this.startupsObservable = this.getStartups('/');
  }
  getStartups(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }


}
