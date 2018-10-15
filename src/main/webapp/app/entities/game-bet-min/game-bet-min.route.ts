import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameBetMin } from 'app/shared/model/game-bet-min.model';
import { GameBetMinService } from './game-bet-min.service';
import { GameBetMinComponent } from './game-bet-min.component';
import { GameBetMinDetailComponent } from './game-bet-min-detail.component';
import { GameBetMinUpdateComponent } from './game-bet-min-update.component';
import { GameBetMinDeletePopupComponent } from './game-bet-min-delete-dialog.component';
import { IGameBetMin } from 'app/shared/model/game-bet-min.model';

@Injectable({ providedIn: 'root' })
export class GameBetMinResolve implements Resolve<IGameBetMin> {
    constructor(private service: GameBetMinService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((gameBetMin: HttpResponse<GameBetMin>) => gameBetMin.body));
        }
        return of(new GameBetMin());
    }
}

export const gameBetMinRoute: Routes = [
    {
        path: 'game-bet-min',
        component: GameBetMinComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'twinbetApp.gameBetMin.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'game-bet-min/:id/view',
        component: GameBetMinDetailComponent,
        resolve: {
            gameBetMin: GameBetMinResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twinbetApp.gameBetMin.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'game-bet-min/new',
        component: GameBetMinUpdateComponent,
        resolve: {
            gameBetMin: GameBetMinResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twinbetApp.gameBetMin.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'game-bet-min/:id/edit',
        component: GameBetMinUpdateComponent,
        resolve: {
            gameBetMin: GameBetMinResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twinbetApp.gameBetMin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gameBetMinPopupRoute: Routes = [
    {
        path: 'game-bet-min/:id/delete',
        component: GameBetMinDeletePopupComponent,
        resolve: {
            gameBetMin: GameBetMinResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twinbetApp.gameBetMin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
