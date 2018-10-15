import { IUser } from 'app/core/user/user.model';

export interface ILeague {
    id?: number;
    nameLeague?: string;
    user?: IUser;
}

export class League implements ILeague {
    constructor(public id?: number, public nameLeague?: string, public user?: IUser) {}
}
