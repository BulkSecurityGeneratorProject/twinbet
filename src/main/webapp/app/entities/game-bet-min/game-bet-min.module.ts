import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwinbetSharedModule } from 'app/shared';
import {
    GameBetMinComponent,
    GameBetMinDetailComponent,
    GameBetMinUpdateComponent,
    GameBetMinDeletePopupComponent,
    GameBetMinDeleteDialogComponent,
    gameBetMinRoute,
    gameBetMinPopupRoute
} from './';

const ENTITY_STATES = [...gameBetMinRoute, ...gameBetMinPopupRoute];

@NgModule({
    imports: [TwinbetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GameBetMinComponent,
        GameBetMinDetailComponent,
        GameBetMinUpdateComponent,
        GameBetMinDeleteDialogComponent,
        GameBetMinDeletePopupComponent
    ],
    entryComponents: [GameBetMinComponent, GameBetMinUpdateComponent, GameBetMinDeleteDialogComponent, GameBetMinDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwinbetGameBetMinModule {}
