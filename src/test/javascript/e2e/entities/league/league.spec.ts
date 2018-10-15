/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LeagueComponentsPage, LeagueDeleteDialog, LeagueUpdatePage } from './league.page-object';

const expect = chai.expect;

describe('League e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let leagueUpdatePage: LeagueUpdatePage;
    let leagueComponentsPage: LeagueComponentsPage;
    let leagueDeleteDialog: LeagueDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Leagues', async () => {
        await navBarPage.goToEntity('league');
        leagueComponentsPage = new LeagueComponentsPage();
        expect(await leagueComponentsPage.getTitle()).to.eq('twinbetApp.league.home.title');
    });

    it('should load create League page', async () => {
        await leagueComponentsPage.clickOnCreateButton();
        leagueUpdatePage = new LeagueUpdatePage();
        expect(await leagueUpdatePage.getPageTitle()).to.eq('twinbetApp.league.home.createOrEditLabel');
        await leagueUpdatePage.cancel();
    });

    it('should create and save Leagues', async () => {
        const nbButtonsBeforeCreate = await leagueComponentsPage.countDeleteButtons();

        await leagueComponentsPage.clickOnCreateButton();
        await promise.all([leagueUpdatePage.setNameLeagueInput('nameLeague'), leagueUpdatePage.userSelectLastOption()]);
        expect(await leagueUpdatePage.getNameLeagueInput()).to.eq('nameLeague');
        await leagueUpdatePage.save();
        expect(await leagueUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await leagueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last League', async () => {
        const nbButtonsBeforeDelete = await leagueComponentsPage.countDeleteButtons();
        await leagueComponentsPage.clickOnLastDeleteButton();

        leagueDeleteDialog = new LeagueDeleteDialog();
        expect(await leagueDeleteDialog.getDialogTitle()).to.eq('twinbetApp.league.delete.question');
        await leagueDeleteDialog.clickOnConfirmButton();

        expect(await leagueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
