import { ILeague } from 'app/shared/model//league.model';

export interface IGameBetMin {
    id?: number;
    nameHome?: string;
    nameAway?: string;
    homeLineHome?: number;
    homeOddsHome?: number;
    homeLineAway?: number;
    homeOddsAway?: number;
    league?: ILeague;
}

export class GameBetMin implements IGameBetMin {
    constructor(
        public id?: number,
        public nameHome?: string,
        public nameAway?: string,
        public homeLineHome?: number,
        public homeOddsHome?: number,
        public homeLineAway?: number,
        public homeOddsAway?: number,
        public league?: ILeague
    ) {}
}
