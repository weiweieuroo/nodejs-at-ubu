import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { God } from '../shared/models/god.model';

@Injectable()
export class GodService {

  constructor(private http: HttpClient) { }

  getGods(): Observable<God[]> {
    return this.http.get<God[]>('/api/gods');
  }

  countGods(): Observable<number> {
    return this.http.get<number>('/api/gods/count');
  }

  addGod(god: God): Observable<God> {
    return this.http.post<God>('/api/god', god);
  }

  getGod(god: God): Observable<God> {
    return this.http.get<God>(`/api/god/${god._id}`);
  }

  editGod(god: God): Observable<string> {
    return this.http.put(`/api/god/${god._id}`, god, { responseType: 'text' });
  }

  deleteGod(god: God): Observable<string> {
    return this.http.delete(`/api/god/${god._id}`, { responseType: 'text' });
  }

}
