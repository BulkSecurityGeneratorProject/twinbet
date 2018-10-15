import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILeague } from 'app/shared/model/league.model';
import { LeagueService } from './league.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-league-update',
    templateUrl: './league-update.component.html'
})
export class LeagueUpdateComponent implements OnInit {
    league: ILeague;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private leagueService: LeagueService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ league }) => {
            this.league = league;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.league.id !== undefined) {
            this.subscribeToSaveResponse(this.leagueService.update(this.league));
        } else {
            this.subscribeToSaveResponse(this.leagueService.create(this.league));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILeague>>) {
        result.subscribe((res: HttpResponse<ILeague>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
