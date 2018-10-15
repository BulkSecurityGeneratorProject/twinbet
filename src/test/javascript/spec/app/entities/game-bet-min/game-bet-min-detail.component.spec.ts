/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TwinbetTestModule } from '../../../test.module';
import { GameBetMinDetailComponent } from 'app/entities/game-bet-min/game-bet-min-detail.component';
import { GameBetMin } from 'app/shared/model/game-bet-min.model';

describe('Component Tests', () => {
    describe('GameBetMin Management Detail Component', () => {
        let comp: GameBetMinDetailComponent;
        let fixture: ComponentFixture<GameBetMinDetailComponent>;
        const route = ({ data: of({ gameBetMin: new GameBetMin(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TwinbetTestModule],
                declarations: [GameBetMinDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GameBetMinDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GameBetMinDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gameBetMin).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
