import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILeague } from 'app/shared/model/league.model';

@Component({
    selector: 'jhi-league-detail',
    templateUrl: './league-detail.component.html'
})
export class LeagueDetailComponent implements OnInit {
    league: ILeague;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ league }) => {
            this.league = league;
        });
    }

    previousState() {
        window.history.back();
    }
}
