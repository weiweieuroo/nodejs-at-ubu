import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dog } from '../shared/models/dog.model';

@Injectable()
export class DogService {

  constructor(private http: HttpClient) { }

  getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>('/api/dogs');
  }

  countDogs(): Observable<number> {
    return this.http.get<number>('/api/dogs/count');
  }

  addDog(dogs: Dog): Observable<Dog> {
    return this.http.post<Dog>('/api/dog', dogs);
  }

  getDog(dogs: Dog): Observable<Dog> {
    return this.http.get<Dog>(`/api/dog/${dogs._id}`);
  }

  editDogs(dogs: Dog): Observable<string> {
    return this.http.put(`/api/dog/${dogs._id}`, dogs, { responseType: 'text' });
  }

  deleteDogs(dogs: Dog): Observable<string> {
    return this.http.delete(`/api/dog/${dogs._id}`, { responseType: 'text' });
  }

}
