import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGameBetMin } from 'app/shared/model/game-bet-min.model';

@Component({
    selector: 'jhi-game-bet-min-detail',
    templateUrl: './game-bet-min-detail.component.html'
})
export class GameBetMinDetailComponent implements OnInit {
    gameBetMin: IGameBetMin;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gameBetMin }) => {
            this.gameBetMin = gameBetMin;
        });
    }

    previousState() {
        window.history.back();
    }
}
