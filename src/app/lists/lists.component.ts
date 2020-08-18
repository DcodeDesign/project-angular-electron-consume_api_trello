import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

import {Lists} from '../models/Lists';
import {ListsService} from '../services/lists.service';

@Component({
    selector: 'app-board',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {
    private idBoard: string;
    private sub: any;

    public lists: Lists[];
    private obsSubscribeLists: Subscription;

    /*
    private inter: any;
    private i = 0;
    private refresh = 0;
    */

    constructor(private route: ActivatedRoute,
                private ListsService: ListsService) {
    }

    ngOnInit() {
        this.initRoutParam();
        this.initLists();
        this.timer;
    }

    initRoutParam() {
        this.sub = this.route.params.subscribe(params => {
            this.idBoard = params['id'];
        });
    }

    initLists() {

        /*
        if (this.i < 1) {
            this.i = 1;
        } else {
            this.refresh = 10000;
        }

        this.inter = setInterval(() => {
         */

        this.obsSubscribeLists = this.ListsService.getLists(this.idBoard).subscribe(
            item => {
                this.lists = item;
                console.log('lists : ' + this.lists);
            },
            error => {
                console.log('lists : ' + error);
            },
            () => {}
        );
        //}, this.refresh);
    }

    reloadChildView(){
        setTimeout(() =>{
            this.initLists();
        }, 500);
    }

    timer: ReturnType<typeof setTimeout> = setTimeout(() => this.initLists()
    , 30000);

    ngOnDestroy() {
        if (this.sub != null && !this.sub.closed) {
            this.sub.unsubscribe();
        }

        if (this.obsSubscribeLists != null && !this.obsSubscribeLists.closed) {
            this.obsSubscribeLists.unsubscribe();
        }

        /*
        clearInterval(this.inter);
        this.i = 0;
         */
    }

}
