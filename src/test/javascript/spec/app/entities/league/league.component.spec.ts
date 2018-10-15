/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TwinbetTestModule } from '../../../test.module';
import { LeagueComponent } from 'app/entities/league/league.component';
import { LeagueService } from 'app/entities/league/league.service';
import { League } from 'app/shared/model/league.model';

describe('Component Tests', () => {
    describe('League Management Component', () => {
        let comp: LeagueComponent;
        let fixture: ComponentFixture<LeagueComponent>;
        let service: LeagueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TwinbetTestModule],
                declarations: [LeagueComponent],
                providers: []
            })
                .overrideTemplate(LeagueComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LeagueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeagueService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new League(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.leagues[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
