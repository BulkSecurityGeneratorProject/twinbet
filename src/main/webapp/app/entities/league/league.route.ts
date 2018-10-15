import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { League } from 'app/shared/model/league.model';
import { LeagueService } from './league.service';
import { LeagueComponent } from './league.component';
import { LeagueDetailComponent } from './league-detail.component';
import { LeagueUpdateComponent } from './league-update.component';
import { LeagueDeletePopupComponent } from './league-delete-dialog.component';
import { ILeague } from 'app/shared/model/league.model';

@Injectable({ providedIn: 'root' })
export class LeagueResolve implements Resolve<ILeague> {
    constructor(private service: LeagueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((league: HttpResponse<League>) => league.body));
        }
        return of(new League());
    }
}

export const leagueRoute: Routes = [
    {
        path: 'league',
        component: LeagueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twinbetApp.league.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'league/:id/view',
        component: LeagueDetailComponent,
        resolve: {
            league: LeagueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twinbetApp.league.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'league/new',
        component: LeagueUpdateComponent,
        resolve: {
            league: LeagueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twinbetApp.league.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'league/:id/edit',
        component: LeagueUpdateComponent,
        resolve: {
            league: LeagueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twinbetApp.league.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const leaguePopupRoute: Routes = [
    {
        path: 'league/:id/delete',
        component: LeagueDeletePopupComponent,
        resolve: {
            league: LeagueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twinbetApp.league.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
