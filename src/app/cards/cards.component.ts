import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Cards} from '../models/Cards';
import {ActivatedRoute} from '@angular/router';
import {CardsService} from '../services/cards.service';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy {
    @Input() public idList: string;

    public cards: Cards[];
    private obsSubscribeCards: Subscription;

    private inter: any;
    private refresh: number = 1000;
    private i: number = 0;

    constructor(private route: ActivatedRoute,
                private CardsService: CardsService) {
    }

    ngOnInit() {
        this.initCards();
    }

    initCards() {
        if (this.i < 1) {
            this.i = 1;
        } else {
            this.refresh = 1000;
        }

        this.inter = setInterval(() => {
            this.obsSubscribeCards = this.CardsService.getCards(this.idList).subscribe(
                item => {
                    this.cards = item;

                    console.log('Cards : ' + this.cards);
                },
                error => {
                    console.log('Cards : ' + error);
                },
                () => {
                }
            );
        }, this.refresh);
    }

    ngOnDestroy() {
        if (this.obsSubscribeCards != null && !this.obsSubscribeCards.closed) {
            this.obsSubscribeCards.unsubscribe();
        }

        clearInterval(this.inter);
        this.i = 0;
    }
}
