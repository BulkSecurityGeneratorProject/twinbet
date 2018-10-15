/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TwinbetTestModule } from '../../../test.module';
import { LeagueDetailComponent } from 'app/entities/league/league-detail.component';
import { League } from 'app/shared/model/league.model';

describe('Component Tests', () => {
    describe('League Management Detail Component', () => {
        let comp: LeagueDetailComponent;
        let fixture: ComponentFixture<LeagueDetailComponent>;
        const route = ({ data: of({ league: new League(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TwinbetTestModule],
                declarations: [LeagueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LeagueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LeagueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.league).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
