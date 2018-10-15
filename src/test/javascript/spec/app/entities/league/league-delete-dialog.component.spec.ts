/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TwinbetTestModule } from '../../../test.module';
import { LeagueDeleteDialogComponent } from 'app/entities/league/league-delete-dialog.component';
import { LeagueService } from 'app/entities/league/league.service';

describe('Component Tests', () => {
    describe('League Management Delete Component', () => {
        let comp: LeagueDeleteDialogComponent;
        let fixture: ComponentFixture<LeagueDeleteDialogComponent>;
        let service: LeagueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TwinbetTestModule],
                declarations: [LeagueDeleteDialogComponent]
            })
                .overrideTemplate(LeagueDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LeagueDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeagueService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
