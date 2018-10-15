import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGameBetMin } from 'app/shared/model/game-bet-min.model';
import { GameBetMinService } from './game-bet-min.service';

@Component({
    selector: 'jhi-game-bet-min-delete-dialog',
    templateUrl: './game-bet-min-delete-dialog.component.html'
})
export class GameBetMinDeleteDialogComponent {
    gameBetMin: IGameBetMin;

    constructor(private gameBetMinService: GameBetMinService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gameBetMinService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gameBetMinListModification',
                content: 'Deleted an gameBetMin'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-bet-min-delete-popup',
    template: ''
})
export class GameBetMinDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gameBetMin }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GameBetMinDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.gameBetMin = gameBetMin;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
