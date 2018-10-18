import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGameBetMin } from 'app/shared/model/game-bet-min.model';
import { GameBetMinService } from './game-bet-min.service';
import { ILeague } from 'app/shared/model/league.model';
import { LeagueService } from 'app/entities/league';

@Component({
    selector: 'jhi-game-bet-min-update',
    templateUrl: './game-bet-min-update.component.html'
})
export class GameBetMinUpdateComponent implements OnInit {
    gameBetMin: IGameBetMin;
    isSaving: boolean;

    leagues: ILeague[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private gameBetMinService: GameBetMinService,
        private leagueService: LeagueService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gameBetMin }) => {
            this.gameBetMin = gameBetMin;
        });
        this.leagueService.query().subscribe(
            (res: HttpResponse<ILeague[]>) => {
                this.leagues = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gameBetMin.id !== undefined) {
            this.subscribeToSaveResponse(this.gameBetMinService.update(this.gameBetMin));
        } else {
            this.subscribeToSaveResponse(this.gameBetMinService.create(this.gameBetMin));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGameBetMin>>) {
        result.subscribe((res: HttpResponse<IGameBetMin>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLeagueById(index: number, item: ILeague) {
        return item.nameLeague;
    }
}
