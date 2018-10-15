/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GameBetMinComponentsPage, GameBetMinDeleteDialog, GameBetMinUpdatePage } from './game-bet-min.page-object';

const expect = chai.expect;

describe('GameBetMin e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gameBetMinUpdatePage: GameBetMinUpdatePage;
    let gameBetMinComponentsPage: GameBetMinComponentsPage;
    let gameBetMinDeleteDialog: GameBetMinDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GameBetMins', async () => {
        await navBarPage.goToEntity('game-bet-min');
        gameBetMinComponentsPage = new GameBetMinComponentsPage();
        expect(await gameBetMinComponentsPage.getTitle()).to.eq('twinbetApp.gameBetMin.home.title');
    });

    it('should load create GameBetMin page', async () => {
        await gameBetMinComponentsPage.clickOnCreateButton();
        gameBetMinUpdatePage = new GameBetMinUpdatePage();
        expect(await gameBetMinUpdatePage.getPageTitle()).to.eq('twinbetApp.gameBetMin.home.createOrEditLabel');
        await gameBetMinUpdatePage.cancel();
    });

    it('should create and save GameBetMins', async () => {
        const nbButtonsBeforeCreate = await gameBetMinComponentsPage.countDeleteButtons();

        await gameBetMinComponentsPage.clickOnCreateButton();
        await promise.all([
            gameBetMinUpdatePage.setNameHomeInput('nameHome'),
            gameBetMinUpdatePage.setNameAwayInput('nameAway'),
            gameBetMinUpdatePage.setHomeLineHomeInput('homeLineHome'),
            gameBetMinUpdatePage.setHomeOddsHomeInput('homeOddsHome'),
            gameBetMinUpdatePage.setHomeLineAwayInput('homeLineAway'),
            gameBetMinUpdatePage.setHomeOddsAwayInput('homeOddsAway'),
            gameBetMinUpdatePage.leagueSelectLastOption()
        ]);
        expect(await gameBetMinUpdatePage.getNameHomeInput()).to.eq('nameHome');
        expect(await gameBetMinUpdatePage.getNameAwayInput()).to.eq('nameAway');
        expect(await gameBetMinUpdatePage.getHomeLineHomeInput()).to.eq('homeLineHome');
        expect(await gameBetMinUpdatePage.getHomeOddsHomeInput()).to.eq('homeOddsHome');
        expect(await gameBetMinUpdatePage.getHomeLineAwayInput()).to.eq('homeLineAway');
        expect(await gameBetMinUpdatePage.getHomeOddsAwayInput()).to.eq('homeOddsAway');
        await gameBetMinUpdatePage.save();
        expect(await gameBetMinUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gameBetMinComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GameBetMin', async () => {
        const nbButtonsBeforeDelete = await gameBetMinComponentsPage.countDeleteButtons();
        await gameBetMinComponentsPage.clickOnLastDeleteButton();

        gameBetMinDeleteDialog = new GameBetMinDeleteDialog();
        expect(await gameBetMinDeleteDialog.getDialogTitle()).to.eq('twinbetApp.gameBetMin.delete.question');
        await gameBetMinDeleteDialog.clickOnConfirmButton();

        expect(await gameBetMinComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
