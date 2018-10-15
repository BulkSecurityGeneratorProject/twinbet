import { element, by, ElementFinder } from 'protractor';

export class GameBetMinComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-game-bet-min div table .btn-danger'));
    title = element.all(by.css('jhi-game-bet-min div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GameBetMinUpdatePage {
    pageTitle = element(by.id('jhi-game-bet-min-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameHomeInput = element(by.id('field_nameHome'));
    nameAwayInput = element(by.id('field_nameAway'));
    homeLineHomeInput = element(by.id('field_homeLineHome'));
    homeOddsHomeInput = element(by.id('field_homeOddsHome'));
    homeLineAwayInput = element(by.id('field_homeLineAway'));
    homeOddsAwayInput = element(by.id('field_homeOddsAway'));
    leagueSelect = element(by.id('field_league'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameHomeInput(nameHome) {
        await this.nameHomeInput.sendKeys(nameHome);
    }

    async getNameHomeInput() {
        return this.nameHomeInput.getAttribute('value');
    }

    async setNameAwayInput(nameAway) {
        await this.nameAwayInput.sendKeys(nameAway);
    }

    async getNameAwayInput() {
        return this.nameAwayInput.getAttribute('value');
    }

    async setHomeLineHomeInput(homeLineHome) {
        await this.homeLineHomeInput.sendKeys(homeLineHome);
    }

    async getHomeLineHomeInput() {
        return this.homeLineHomeInput.getAttribute('value');
    }

    async setHomeOddsHomeInput(homeOddsHome) {
        await this.homeOddsHomeInput.sendKeys(homeOddsHome);
    }

    async getHomeOddsHomeInput() {
        return this.homeOddsHomeInput.getAttribute('value');
    }

    async setHomeLineAwayInput(homeLineAway) {
        await this.homeLineAwayInput.sendKeys(homeLineAway);
    }

    async getHomeLineAwayInput() {
        return this.homeLineAwayInput.getAttribute('value');
    }

    async setHomeOddsAwayInput(homeOddsAway) {
        await this.homeOddsAwayInput.sendKeys(homeOddsAway);
    }

    async getHomeOddsAwayInput() {
        return this.homeOddsAwayInput.getAttribute('value');
    }

    async leagueSelectLastOption() {
        await this.leagueSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async leagueSelectOption(option) {
        await this.leagueSelect.sendKeys(option);
    }

    getLeagueSelect(): ElementFinder {
        return this.leagueSelect;
    }

    async getLeagueSelectedOption() {
        return this.leagueSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class GameBetMinDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gameBetMin-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gameBetMin'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
