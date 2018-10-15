import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGameBetMin } from 'app/shared/model/game-bet-min.model';

type EntityResponseType = HttpResponse<IGameBetMin>;
type EntityArrayResponseType = HttpResponse<IGameBetMin[]>;

@Injectable({ providedIn: 'root' })
export class GameBetMinService {
    private resourceUrl = SERVER_API_URL + 'api/game-bet-mins';

    constructor(private http: HttpClient) {}

    create(gameBetMin: IGameBetMin): Observable<EntityResponseType> {
        return this.http.post<IGameBetMin>(this.resourceUrl, gameBetMin, { observe: 'response' });
    }

    update(gameBetMin: IGameBetMin): Observable<EntityResponseType> {
        return this.http.put<IGameBetMin>(this.resourceUrl, gameBetMin, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGameBetMin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGameBetMin[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
