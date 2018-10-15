import { ILeague } from 'app/shared/model//league.model';

export interface IGameBetMin {
    id?: number;
    nameHome?: string;
    nameAway?: string;
    homeLineHome?: string;
    homeOddsHome?: string;
    homeLineAway?: string;
    homeOddsAway?: string;
    league?: ILeague;
}

export class GameBetMin implements IGameBetMin {
    constructor(
        public id?: number,
        public nameHome?: string,
        public nameAway?: string,
        public homeLineHome?: string,
        public homeOddsHome?: string,
        public homeLineAway?: string,
        public homeOddsAway?: string,
        public league?: ILeague
    ) {}
}
