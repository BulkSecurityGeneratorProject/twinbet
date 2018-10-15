import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILeague } from 'app/shared/model/league.model';
import { Principal } from 'app/core';
import { LeagueService } from './league.service';

@Component({
    selector: 'jhi-league',
    templateUrl: './league.component.html'
})
export class LeagueComponent implements OnInit, OnDestroy {
    leagues: ILeague[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private leagueService: LeagueService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.leagueService.query().subscribe(
            (res: HttpResponse<ILeague[]>) => {
                this.leagues = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLeagues();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILeague) {
        return item.id;
    }

    registerChangeInLeagues() {
        this.eventSubscriber = this.eventManager.subscribe('leagueListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
