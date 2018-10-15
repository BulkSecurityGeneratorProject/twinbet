/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TwinbetTestModule } from '../../../test.module';
import { GameBetMinDeleteDialogComponent } from 'app/entities/game-bet-min/game-bet-min-delete-dialog.component';
import { GameBetMinService } from 'app/entities/game-bet-min/game-bet-min.service';

describe('Component Tests', () => {
    describe('GameBetMin Management Delete Component', () => {
        let comp: GameBetMinDeleteDialogComponent;
        let fixture: ComponentFixture<GameBetMinDeleteDialogComponent>;
        let service: GameBetMinService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TwinbetTestModule],
                declarations: [GameBetMinDeleteDialogComponent]
            })
                .overrideTemplate(GameBetMinDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GameBetMinDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameBetMinService);
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
