import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwinbetSharedModule } from 'app/shared';
import { TwinbetAdminModule } from 'app/admin/admin.module';
import {
    LeagueComponent,
    LeagueDetailComponent,
    LeagueUpdateComponent,
    LeagueDeletePopupComponent,
    LeagueDeleteDialogComponent,
    leagueRoute,
    leaguePopupRoute
} from './';

const ENTITY_STATES = [...leagueRoute, ...leaguePopupRoute];

@NgModule({
    imports: [TwinbetSharedModule, TwinbetAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LeagueComponent, LeagueDetailComponent, LeagueUpdateComponent, LeagueDeleteDialogComponent, LeagueDeletePopupComponent],
    entryComponents: [LeagueComponent, LeagueUpdateComponent, LeagueDeleteDialogComponent, LeagueDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwinbetLeagueModule {}
