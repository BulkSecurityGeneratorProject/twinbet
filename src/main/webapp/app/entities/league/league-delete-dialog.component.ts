import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILeague } from 'app/shared/model/league.model';
import { LeagueService } from './league.service';

@Component({
    selector: 'jhi-league-delete-dialog',
    templateUrl: './league-delete-dialog.component.html'
})
export class LeagueDeleteDialogComponent {
    league: ILeague;

    constructor(private leagueService: LeagueService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.leagueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'leagueListModification',
                content: 'Deleted an league'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-league-delete-popup',
    template: ''
})
export class LeagueDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ league }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LeagueDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.league = league;
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
