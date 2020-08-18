import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {BoardsService} from '../services/boards.service';
import {Boards} from '../models/Boards';
import {Observable, Subscription} from 'rxjs';
import 'rxjs-compat/add/observable/timer';

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {

    public boards: Boards[];
    @Output() public sendtitleView = new EventEmitter<any>();
    private obsSubscribe: Subscription;
    private inter: any;
    private refresh: number = 1000;
    private i: number = 0;

    constructor(private valuesService: BoardsService) {
    }

    ngOnInit(): void {
        this.initBoards();
    }

    initBoards() {
        if (this.i < 1) {
            this.i = 1;
            console.log('Count' + this.i);
        } else {
            this.refresh = 1000;
        }

        this.inter = setInterval(() => {
            this.obsSubscribe = this.valuesService.getBoards().subscribe(
                item => {
                    this.boards = item.slice().reverse();

                    console.log('Boards : ' + this.boards);
                },
                error => {
                    console.log('Boards : ' + error);
                },
                () => {
                }
            );
        }, this.refresh);
    }


    ngOnDestroy(): void {
        if (this.obsSubscribe != null && !this.obsSubscribe.closed) {
            this.obsSubscribe.unsubscribe();
        }

        clearInterval(this.inter);
        this.i = 0;

    }
}
